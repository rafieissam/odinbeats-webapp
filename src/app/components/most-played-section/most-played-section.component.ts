import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongApiService } from '../../services/song-api.service';
import { MusicPlayerService } from '../../services/music-player.service';
import { LoaderComponent } from '../loader/loader.component';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-most-played-section',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './most-played-section.component.html',
  styleUrl: './most-played-section.component.scss'
})
export class MostPlayedSectionComponent implements OnInit {

  isLoading: boolean = false;
  mostPlayedSongs: Song[] = [];

  constructor(
    private songService: SongApiService,
    private musicPlayerService: MusicPlayerService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.songService.getTopTen().subscribe(songs => {
      this.mostPlayedSongs = songs;
      this.isLoading = false;
    });
  }

  playSong(song: Song) {
    this.musicPlayerService.startStandaloneSong(song);
  }
}
