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
export class UserPlaylistsApiService {

  constructor() { }

  getUserPlaylist(playlistId: string) {}
  getUserPlaylists(): Observable<Playlist[]> {
    return new Observable(subscriber => {
      let playlists = DUMMY_PLAYLISTS as Playlist[];
      playlists = playlists.map(p => {
        p.totalDuration = 0;
        if (p.songs) {
          for (let playlistSong of p.songs) {
            p.totalDuration += playlistSong.song.duration;
          }
        }
        return p;
      })
      subscriber.next(playlists);
      subscriber.complete();
    });
  }
  
  createUserPlaylist(playlistDto: PlaylistDto) {}
  updateUserPlaylist(playlistId: string, playlistDto: PlaylistDto) {}
  deleteUserPlaylist(playlistId: string) {}

  addSongToPlaylist(playlistId: string, songId: string) {}
  removeSongFromPlaylist(playlistId: string, songId: string) {}
}
