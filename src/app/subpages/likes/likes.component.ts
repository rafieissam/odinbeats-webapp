import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamPlay, jamMusic, jamClock, jamMic } from '@ng-icons/jam-icons';
import { SongApiService } from '../../services/song-api.service';
import { MusicPlayerService } from '../../services/music-player.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UserPillComponent } from '../../components/user-pill/user-pill.component';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { DurationToStringPipe } from '../../pipes/duration-to-string.pipe';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { PlaylistSong } from '../../interfaces/playlist-song';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-likes',
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
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss'
})
export class LikesComponent implements OnInit {
  isLoading: boolean = false;
  fakePlaylist?: Playlist;
  listOfArtists: string = '';
  songs: Song[] = [];

  constructor(
    private songService: SongApiService,
    private musicPlayerService: MusicPlayerService,
  ) { }

  get activeSongIndex() {
    if (this.fakePlaylist && this.musicPlayerService.activePlaylistId == this.fakePlaylist.id) {
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
    this.likedSongs();
  }

  likedSongs() {
    this.isLoading = true;
    this.songService.watchLikedSongs().subscribe(songs => {
      this.songs = songs;
      this.generateFakePlaylist();
      this.formatArtists();
      this.isLoading = false;
    })
  }
  
  generateFakePlaylist() {
    let totalDuration = 0;
    let mappedSongs = this.songs.map(s => ({ song: s, addedAt: new Date() })) as PlaylistSong[];
    this.songs.forEach(s => totalDuration += s.duration);
    this.fakePlaylist = {
      id: 'likedSongs',
      name: 'Liked Songs',
      songs: mappedSongs,
      totalDuration,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
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
    if (!this.fakePlaylist) return;
    this.musicPlayerService.startPlaylist(this.fakePlaylist, index);
  }
}
