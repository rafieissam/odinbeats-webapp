import { Injectable } from '@angular/core';

type SongSortBy = "name" | "plays" | "likes";
type SongSortDir = "asc" | "desc";

@Injectable({
  providedIn: 'root'
})
export class SongsApiService {

  constructor() { }

  getSong(songId: string) {}
  getSongs(searchFilter: string, sortBy: SongSortBy, sortDir: SongSortDir) {}
}
