import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamHome, jamHomeF, jamHeart, jamHeartF, jamSpeaker, jamSpeakerF, jamBook, jamBookF, jamDisc, jamPlusRectangle } from '@ng-icons/jam-icons';
import { firstValueFrom } from 'rxjs';
import { PlaylistApiService } from '../../services/playlist-api.service';
import { LogoComponent } from '../logo/logo.component';
import { Playlist } from '../../interfaces/playlist';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    LogoComponent,
  ],
  providers: [provideIcons({ jamHome, jamHomeF, jamHeart, jamHeartF, jamSpeaker, jamSpeakerF, jamBook, jamBookF, jamDisc, jamPlusRectangle })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  routes = [
    { title: 'Home', route: '', icon: 'jamHome', activeIcon: 'jamHomeF' },
    { title: 'Search', route: 'search', icon: 'jamSpeaker', activeIcon: 'jamSpeakerF' },
    { title: 'Liked Songs', route: 'likes', icon: 'jamHeart', activeIcon: 'jamHeartF' },
    { title: 'Library', route: 'library', icon: 'jamBook', activeIcon: 'jamBookF' },
  ];

  playlists: Playlist[] = [];

  constructor(
    private playlistService: PlaylistApiService,
  ) {}

  ngOnInit(): void {
    this.playlistService.watchAll().subscribe(playlists => {
      this.playlists = playlists;
    });
  }

  createPlaylist() {
    firstValueFrom(this.playlistService.createOne());
  }
}
