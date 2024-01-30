import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../interfaces/song';

const DUMMY_SONGS = require('../temp-dummy-data/songs.json');

@Injectable({
  providedIn: 'root'
})
export class UserSongsApiService {

  constructor() { }

  registerPlaySong(songId: string) {}

  getLikedSongs(): Observable<Song[]> {
    return new Observable(subscriber => {
      let songs = DUMMY_SONGS;
      subscriber.next(songs);
      subscriber.complete();
    });
  }

  getMostPlayedSongs(): Observable<Song[]> {
    return new Observable(subscriber => {
      let songs = DUMMY_SONGS as Song[];
      songs = songs.sort((a, b) => a.myPlays as number - (b.myPlays as number) > 0 ? 1 : -1);
      subscriber.next(songs);
      subscriber.complete();
    });
  }
  
  likeSong(songId: string) {}
  unlikeSong(songId: string) {}
}
