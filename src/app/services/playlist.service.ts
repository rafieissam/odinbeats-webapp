import { Injectable } from '@angular/core';
import { Playlist } from '../interfaces/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  playlists: Playlist[] = [
    { id: '1', name: 'Playlist 1', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Playlist 2', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', name: 'Playlist 3', createdAt: new Date(), updatedAt: new Date() },
    { id: '4', name: 'Playlist 4', createdAt: new Date(), updatedAt: new Date() },
  ];

  constructor() { }
}
