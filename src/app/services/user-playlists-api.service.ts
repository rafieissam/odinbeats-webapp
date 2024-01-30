import { Injectable } from '@angular/core';

type PlaylistDto = {
  name: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserPlaylistsApiService {

  constructor() { }

  getUserPlaylist(playlistId: string) {}
  getUserPlaylists() {}
  
  createUserPlaylist(playlistDto: PlaylistDto) {}
  updateUserPlaylist(playlistId: string, playlistDto: PlaylistDto) {}
  deleteUserPlaylist(playlistId: string) {}

  addSongToPlaylist(playlistId: string, songId: string) {}
  removeSongFromPlaylist(playlistId: string, songId: string) {}
}
