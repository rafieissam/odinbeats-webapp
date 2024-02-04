import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SongApiService } from '../../services/song-api.service';
import { SongListComponent } from '../song-list/song-list.component';
import { LoaderComponent } from '../loader/loader.component';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-liked-songs-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoaderComponent,
    SongListComponent,
  ],
  templateUrl: './liked-songs-section.component.html',
  styleUrl: './liked-songs-section.component.scss'
})
export class LikedSongsSectionComponent implements OnInit {

  isLoading: boolean = false;
  likedSongs: Song[] = [];
  
  constructor(
    private songService: SongApiService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.songService.watchLikedSongs().subscribe(songs => {
      this.likedSongs = songs;
      this.isLoading = false;
    });
  }

}
