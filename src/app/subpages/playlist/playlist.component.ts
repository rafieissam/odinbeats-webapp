import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../../interfaces/playlist';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { DurationToStringPipe } from '../../pipes/duration-to-string.pipe';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { jamPlay, jamMusic, jamClock, jamMic } from '@ng-icons/jam-icons';
import { Song } from '../../interfaces/song';
import { MusicPlayerService } from '../../services/music-player.service';
import { PlaylistApiService } from '../../services/playlist-api.service';
import { UserPillComponent } from '../../components/user-pill/user-pill.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    LoaderComponent,
    DurationToMinsPipe,
    DurationToStringPipe,
    UserPillComponent,
  ],
  providers: [
    provideIcons({ jamPlay, jamMusic, jamClock, jamMic })
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit {
  isLoading: boolean = false;
  playlistId!: string;
  playlist?: Playlist;
  listOfArtists: string = '';
  songs: Song[] = [];

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistApiService,
    private musicPlayerService: MusicPlayerService,
  ) { }

  get activeSongIndex() {
    if (this.playlist && this.musicPlayerService.activePlaylistId == this.playlist.id) {
      let index = -1;
      for (let i = 0; i < this.songs.length; i++) {
        if (this.songs[i].id == this.musicPlayerService.activeSongId) {
          index = i;
          break;
        }
      }
      return index;
    } else {
      return -1;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('playlistId')) {
        this.playlistId = paramMap.get('playlistId') || '';
        this.fetchPlaylist();
      }
    });
  }

  fetchPlaylist() {
    this.isLoading = true;
    this.playlistService.getOne(this.playlistId).subscribe(playlist => {
      this.playlist = playlist;
      this.mapSongs();
      this.formatArtists();
      this.isLoading = false;
    })
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

  formatArtists() {
    let artists: any = [];
    for (let song of this.songs) {
      if (song.artist && !artists.includes(song.artist)) {
        artists.push(song.artist);
        if (artists.length > 3) break;
      }
    }
    if (artists.length > 3) {
      artists = artists.slice(0, 3);
      artists.push('and more.');
    } 
    this.listOfArtists = artists.join(', ');
  }

  startAtSong(index: number) {
    if (!this.playlist) return;
    this.musicPlayerService.startPlaylist(this.playlist, index);
  }
}
