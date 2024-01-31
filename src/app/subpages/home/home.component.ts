import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamSearch, jamUserCircle } from '@ng-icons/jam-icons';
import { Song } from '../../interfaces/song';
import { UserSongsApiService } from '../../services/user-songs-api.service';
import { UserPlaylistsApiService } from '../../services/user-playlists-api.service';
import { Playlist } from '../../interfaces/playlist';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { DurationToStringPipe } from '../../duration-to-string.pipe';
import { MusicPlayerService } from '../../services/music-player.service';
import { LoaderComponent } from '../../components/loader/loader.component';

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

  constructor(
    private musicPlayerService: MusicPlayerService,
    private userSongs: UserSongsApiService,
    private userPlaylists: UserPlaylistsApiService,
  ) {
    this.mostPlayedLoading = true;
    this.userSongs.getMostPlayedSongs().subscribe(songs => {
      this.myMostPlayedSongs = songs;
      this.mostPlayedLoading = false;
    });
    this.likesLoading = true;
    this.userSongs.getLikedSongs().subscribe(songs => {
      this.likedSongs = songs;
      this.likesLoading = false;
    });
    this.playlistsLoading = true;
    this.userPlaylists.getUserPlaylists().subscribe(playlists => {
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
}
