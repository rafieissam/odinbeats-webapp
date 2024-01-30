import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamSearch, jamUserCircle } from '@ng-icons/jam-icons';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { Song } from '../../interfaces/song';
import { UserSongsApiService } from '../../services/user-songs-api.service';
import { UserPlaylistsApiService } from '../../services/user-playlists-api.service';
import { Playlist } from '../../interfaces/playlist';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { DurationToStringPipe } from '../../duration-to-string.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    MusicPlayerComponent,
    DurationToMinsPipe,
    DurationToStringPipe,
  ],
  providers: [
    provideIcons({ jamSearch, jamUserCircle }),
    UserSongsApiService,
    UserPlaylistsApiService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  recents = ['1', '2', '3'];
  activeSong?: Song;
  likedSongs: Song[] = [];
  myMostPlayedSongs: Song[] = [];
  myPlaylists: Playlist[] = [];

  constructor(
    private userSongs: UserSongsApiService,
    private userPlaylists: UserPlaylistsApiService,
  ) {
    this.userSongs.getLikedSongs().subscribe(songs => {
      this.likedSongs = songs;
    });
    this.userSongs.getMostPlayedSongs().subscribe(songs => {
      this.myMostPlayedSongs = songs;
    });
    this.userPlaylists.getUserPlaylists().subscribe(playlists => {
      this.myPlaylists = playlists;
    });
  }

  playSong(song: Song) {
    this.activeSong = song;
  }

  getPlaylistImage(playlist: Playlist) {
    return playlist?.songs?.length ? playlist.songs[0].song.image : ''; 
  }
}
