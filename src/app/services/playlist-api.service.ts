import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { Playlist } from '../interfaces/playlist';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SnackbarService } from './snackbar.service';

type PlaylistUpdateDto = {
  name: string;
};

@Injectable({
  providedIn: 'root'
})
export class PlaylistApiService {
  private readonly API_URL = environment.API_BASE_URL + '/playlists';
  
  playlists: Playlist[] = [];
  playlistsSubject: BehaviorSubject<Playlist[]> = new BehaviorSubject<Playlist[]>([]);
  playlistsObservable: Observable<Playlist[]> = this.playlistsSubject.asObservable();
  refreshingObservable?: Observable<Playlist[]>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbarService: SnackbarService,
  ) { }

  watchAll(): Observable<Playlist[]> {
    if (!this.playlists.length) {
      return this.refreshAll().pipe(
        concatMap(() => {
          return this.playlistsObservable;
        })
      );
    }
    return this.playlistsObservable;
  }

  getAll(): Observable<Playlist[]> {
    if (this.playlists.length) {
      return new Observable<Playlist[]>(subscriber => {
        subscriber.next(this.playlists);
        subscriber.complete();
      });
    }
    return this.refreshAll();
  }

  refreshAll(): Observable<Playlist[]> {
    if (!this.refreshingObservable) {
      this.refreshingObservable = this.http.get<Playlist[]>(`${this.API_URL}`).pipe(
        map(playlists => {
          playlists = playlists.map(playlist => this.addPlaylistProps(playlist));
          this.playlists = playlists;
          this.playlistsSubject.next(this.playlists);
          return playlists;
        }),
        shareReplay(1)
      );

      this.refreshingObservable.subscribe({
        complete: () => {
          this.refreshingObservable = undefined;
        },
        error: () => {
          this.refreshingObservable = undefined;
        }
      });
    }

    return this.refreshingObservable;
  }

  getOne(playlistId: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.API_URL}/${playlistId}`).pipe(
      map(playlist => {
        return this.addPlaylistProps(playlist);
      })
    );
  }

  private addPlaylistProps(playlist: Playlist) {
    playlist.totalDuration = 0;
    let image;
    if (playlist.songs) {
      for (let playlistSong of playlist.songs) {
        playlist.totalDuration += playlistSong.song.duration;
        if (!image && playlistSong.song.image) {
          image = playlistSong.song.image;
        }
      }
    }
    playlist.image = image || './assets/images/playlist_placeholder.png';
    return playlist;
  }
  
  createOne() {
    return this.http.post<Playlist>(`${this.API_URL}`, {}).pipe(
      tap(resp => {
        const newPlaylistId = resp.id;
        this.refreshAll().pipe(
          switchMap(() => {
            this.router.navigate(['library', newPlaylistId]);
            return of(newPlaylistId);
          })
        ).subscribe();
      })
    );
  }

  updateOne(playlistId: string, dto: PlaylistUpdateDto) {
    return this.http.patch<any>(`${this.API_URL}/${playlistId}`, dto);
  }

  deleteOne(playlistId: string) {
    return this.http.delete<any>(`${this.API_URL}/${playlistId}`).pipe(switchMap(this.refreshAll.bind(this)));
  }

  addSongToPlaylist(playlistId: string, songId: string) {
    return this.http.patch<any>(`${this.API_URL}/${playlistId}/add-song`, { songId }).pipe(
      tap(() => {
        this.snackbarService.showMessage('Added song to playlist');
      }),
      switchMap(this.refreshAll.bind(this))
    );
  }

  removeSongFromPlaylist(playlistId: string, songId: string) {
    return this.http.patch<any>(`${this.API_URL}/${playlistId}/remove-song`, { songId }).pipe(
      tap(() => {
        this.snackbarService.showMessage('Removed song from playlist');
      }),
      switchMap(this.refreshAll.bind(this))
    );
  }
}
