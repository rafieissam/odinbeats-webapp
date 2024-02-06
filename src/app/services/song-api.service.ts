import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, switchMap, tap } from 'rxjs';
import { Song } from '../interfaces/song';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

type GetSongsDto = {
  text?: string;
  skip?: number;
  limit?: number;
  orderBy?: 'name' | 'plays' | 'likes';
  orderDir?: 'asc' | 'desc';
};

@Injectable({
  providedIn: 'root'
})
export class SongApiService {
  private readonly API_URL = environment.API_BASE_URL + '/songs';
  
  likedSongs: Song[] = [];
  likedSongsSubject: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);
  likedSongsObservable: Observable<Song[]> = this.likedSongsSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  registerPlay(songId: string) {
    return this.http.post<any>(`${this.API_URL}/${songId}/play`, {});
  }
  
  getSongs(dto: GetSongsDto = {}): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.API_URL}`, { params: dto });
  }

  getTopTen(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.API_URL}/top-ten`);
  }

  watchLikedSongs(): Observable<Song[]> {
    if (!this.likedSongs.length) {
      return this.refreshLikedSongs().pipe(
        concatMap(() => {
          return this.likedSongsObservable;
        })
      );
    }
    return this.likedSongsObservable;
  }

  getLikedSongs(): Observable<Song[]> {
    if (this.likedSongs.length) {
      return new Observable<Song[]>(subscriber => {
        subscriber.next(this.likedSongs);
        subscriber.complete();
      });
    }
    return this.refreshLikedSongs();
  }

  refreshLikedSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.API_URL}/liked`).pipe(
      tap(songs => {
        this.likedSongs = songs;
        this.likedSongsSubject.next(this.likedSongs);
      })
    );
  }

  likeSong(songId: string): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/${songId}/like`, {}).pipe(switchMap(this.refreshLikedSongs.bind(this)));
  }

  unlikeSong(songId: string): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/${songId}/unlike`, {}).pipe(switchMap(this.refreshLikedSongs.bind(this)));
  }
}
