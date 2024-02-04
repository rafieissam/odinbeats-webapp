import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerService } from '../../services/music-player.service';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [
    CommonModule,
    DurationToMinsPipe,
  ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent implements OnInit {
  @Input('songs') songs?: Song[];
  @Input('playlist') playlist?: Playlist;

  playlistMode: boolean = false;

  constructor(
    private musicPlayerService: MusicPlayerService,
  ) { }

  get activeSongId() {
    return this.musicPlayerService.activeSongId;
  }

  ngOnInit(): void {
    this.playlistMode = !!this.playlist;
    if (this.playlistMode) {
      this.mapSongs();
    }
  }

  mapSongs() {
    if (!this.playlist || !this.playlist.songs) {
      this.songs = [];
      return;
    }
    let songs: Song[] = [];
    this.playlist.songs.forEach(playlistSong => {
      songs.push(playlistSong.song);;
    });
    this.songs = songs;
  }

  playSong(song: Song, index: number) {
    if (this.playlistMode) {
      this.startPlaylistAt(index);
    } else {
      this.musicPlayerService.startStandaloneSong(song);
    }
  }

  startPlaylistAt(index: number) {
    if (!this.playlist) return;
    this.musicPlayerService.startPlaylist(this.playlist, index);
  }

}
