import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../interfaces/playlist';

const DUMMY_PLAYLISTS = require('../temp-dummy-data/playlists.json');

type PlaylistDto = {
  name: string;
};

@Injectable({
  providedIn: 'root'
})
export class PlaylistApiService {

  constructor() { }

  getUserPlaylist(playlistId: string): Observable<Playlist> {
    return new Observable(subscriber => {
      this.getUserPlaylists().subscribe(playlists => {
        let playlist = playlists.filter(p => p.id == playlistId)[0];
        subscriber.next(playlist);
        subscriber.complete();
      });
    });
  }

  getUserPlaylists(): Observable<Playlist[]> {
    return new Observable(subscriber => {
      let playlists = DUMMY_PLAYLISTS as Playlist[];
      playlists = playlists.map(p => {
        p.totalDuration = 0;
        let image;
        if (p.songs) {
          for (let playlistSong of p.songs) {
            p.totalDuration += playlistSong.song.duration;
            if (!image && playlistSong.song.image) {
              image = playlistSong.song.image;
            }
          }
        }
        p.image = image;
        return p;
      });
      setTimeout(() => {
        subscriber.next(playlists);
        subscriber.complete();
      }, 1000);
    });
  }
  
  createUserPlaylist() {
    console.log("Create Playlist and Reroute");
  }
  updateUserPlaylist(playlistId: string, playlistDto: PlaylistDto) {}
  deleteUserPlaylist(playlistId: string) {}

  addSongToPlaylist(playlistId: string, songId: string) {}
  removeSongFromPlaylist(playlistId: string, songId: string) {}
}
