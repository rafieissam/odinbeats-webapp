import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamSearch, jamUserCircle } from '@ng-icons/jam-icons';
import { Song } from '../../interfaces/song';
import { Playlist } from '../../interfaces/playlist';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { DurationToStringPipe } from '../../pipes/duration-to-string.pipe';
import { MusicPlayerService } from '../../services/music-player.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { User } from '../../interfaces/user';
import { UserPillComponent } from '../../components/user-pill/user-pill.component';
import { PlaylistApiService } from '../../services/playlist-api.service';
import { SongApiService } from '../../services/song-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    LoaderComponent,
    DurationToMinsPipe,
    DurationToStringPipe,
    UserPillComponent,
    FormsModule,
  ],
  providers: [
    provideIcons({ jamSearch, jamUserCircle }),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  myMostPlayedSongs: Song[] = [];
  likedSongs: Song[] = [];
  myPlaylists: Playlist[] = [];

  mostPlayedLoading: boolean = false;
  likesLoading: boolean = false;
  playlistsLoading: boolean = false;

  user?: User;

  searchText: string = '';

  constructor(
    private router: Router,
    private musicPlayerService: MusicPlayerService,
    private songService: SongApiService,
    private playlistService: PlaylistApiService,
  ) {
    this.mostPlayedLoading = true;
    this.songService.getTopTen().subscribe(songs => {
      this.myMostPlayedSongs = songs;
      this.mostPlayedLoading = false;
    });
    this.likesLoading = true;
    this.songService.watchLikedSongs().subscribe(songs => {
      this.likedSongs = songs;
      this.likesLoading = false;
    });
    this.playlistsLoading = true;
    this.playlistService.watchAll().subscribe(playlists => {
      this.myPlaylists = playlists;
      this.playlistsLoading = false;
    });
  }

  playSong(song: Song) {
    this.musicPlayerService.startStandaloneSong(song);
  }

  playPlaylist(playlist: Playlist) {
    this.musicPlayerService.startPlaylist(playlist);
  }

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { text: this.searchText }});
  }
}
