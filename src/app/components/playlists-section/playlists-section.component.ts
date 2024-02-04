import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlaylistApiService } from '../../services/playlist-api.service';
import { LoaderComponent } from '../loader/loader.component';
import { DurationToStringPipe } from '../../pipes/duration-to-string.pipe';
import { Playlist } from '../../interfaces/playlist';

@Component({
  selector: 'app-playlists-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoaderComponent,
    DurationToStringPipe,
  ],
  templateUrl: './playlists-section.component.html',
  styleUrl: './playlists-section.component.scss'
})
export class PlaylistsSectionComponent implements OnInit {
  isLoading: boolean = false;
  playlists: Playlist[] = [];

  constructor(
    private playlistService: PlaylistApiService, 
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.playlistService.watchAll().subscribe(playlists => {
      this.playlists = playlists;
      this.isLoading = false;
    });
  }

}
