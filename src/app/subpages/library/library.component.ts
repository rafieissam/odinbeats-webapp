import { Component, OnInit } from '@angular/core';
import { UserPlaylistsApiService } from '../../services/user-playlists-api.service';
import { Playlist } from '../../interfaces/playlist';
import { DurationToStringPipe } from '../../pipes/duration-to-string.pipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamPlusRectangle } from '@ng-icons/jam-icons';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MusicPlayerService } from '../../services/music-player.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIconComponent,
    LoaderComponent,
    DurationToStringPipe,
  ],
  providers: [
    provideIcons({ jamPlusRectangle })
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
  isLoading: boolean = false;
  playlists: Playlist[] = [];

  constructor(
    private playlistService: UserPlaylistsApiService,
    private musicPlayerService: MusicPlayerService,
  ) { }

  get activePlaylistId() {
    return this.musicPlayerService.activePlaylistId || -1;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.playlistService.getUserPlaylists().subscribe(playlists => {
      this.playlists = playlists;
      this.isLoading = false;
    });
  }

  createPlaylist() {
    this.playlistService.createUserPlaylist();
  }
}
