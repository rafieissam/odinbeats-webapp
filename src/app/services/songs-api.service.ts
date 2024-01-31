import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../interfaces/song';

const DUMMY_SONGS = require('../temp-dummy-data/songs.json');

type SongSortBy = "name" | "plays" | "likes";
type SongSortDir = "asc" | "desc";

@Injectable({
  providedIn: 'root'
})
export class SongsApiService {

  constructor() { }

  getSong(songId: string) {}
  getSongs(searchFilter: string, sortBy: SongSortBy, sortDir: SongSortDir) {}
  getMostPlayedSongs(): Observable<Song[]> {
    return new Observable(subscriber => {
      let songs = DUMMY_SONGS as Song[];
      songs = songs.sort((a, b) => a.myPlays as number - (b.myPlays as number) > 0 ? 1 : -1);
      setTimeout(() => {
        subscriber.next(songs);
        subscriber.complete();
      }, 1000);
    });
  }
}
