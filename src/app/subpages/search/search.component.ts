import { ApplicationModule, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongApiService } from '../../services/song-api.service';
import { Song } from '../../interfaces/song';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamSearch } from '@ng-icons/jam-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPillComponent } from '../../components/user-pill/user-pill.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { MusicPlayerService } from '../../services/music-player.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    FormsModule,
    UserPillComponent,
    LoaderComponent,
    DurationToMinsPipe,
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
    private router: Router,
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

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { text: this.searchText }});
  }

  playSong(song: Song) {
    this.musicPlayerService.startStandaloneSong(song);
  }
  
}
