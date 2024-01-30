import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamHome, jamHeart, jamBook, jamDisc, jamPlusRectangle } from '@ng-icons/jam-icons';
import { LogoComponent } from '../logo/logo.component';
import { PlaylistService } from '../../services/playlist.service';
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
  providers: [provideIcons({ jamHome, jamHeart, jamBook, jamDisc, jamPlusRectangle })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  routes = [
    { title: 'Home', route: '', icon: 'jamHome' },
    { title: 'Liked Songs', route: 'likes', icon: 'jamHeart' },
    { title: 'Library', route: 'library', icon: 'jamBook' },
  ];

  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlists = this.playlistService.playlists;
  }
}
