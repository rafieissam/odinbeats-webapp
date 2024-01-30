import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSongsApiService {

  constructor() { }

  registerPlaySong(songId: string) {}

  getLikedSongs() {}
  
  likeSong(songId: string) {}
  unlikeSong(songId: string) {}
}
