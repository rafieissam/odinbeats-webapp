import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamSearch } from '@ng-icons/jam-icons';
import { SongApiService } from '../../services/song-api.service';
import { MusicPlayerService } from '../../services/music-player.service';
import { UserPillComponent } from '../../components/user-pill/user-pill.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { SongSearcherComponent } from '../../components/song-searcher/song-searcher.component';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    UserPillComponent,
    LoaderComponent,
    DurationToMinsPipe,
    SongListComponent,
    SongSearcherComponent,
  ],
  providers: [
    provideIcons({ jamSearch }),
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  isLoading: boolean = false;
  searchText: string = '';
  searchedOnce: boolean = false;
  songs: Song[] = [];

  constructor(
    private route: ActivatedRoute,
    private songService: SongApiService,
    private musicPlayerService: MusicPlayerService,
  ) { }

  get activeSongId() {
    return this.musicPlayerService.activeSongId;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['text'] || '';
      if (!this.searchText.trim().length) return;
      this.searchedOnce = true;
      this.isLoading = true;
      this.songService.getSongs({
        text: this.searchText,
      }).subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
    });
  }

  playSong(song: Song) {
    this.musicPlayerService.startStandaloneSong(song);
  }
  
}
