import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamPlay, jamMusic, jamClock, jamMic } from '@ng-icons/jam-icons';
import { MusicPlayerService } from '../../services/music-player.service';
import { PlaylistApiService } from '../../services/playlist-api.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UserPillComponent } from '../../components/user-pill/user-pill.component';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { DurationToStringPipe } from '../../pipes/duration-to-string.pipe';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';

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
    SongListComponent,
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
