import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamSearch, jamUserCircle } from '@ng-icons/jam-icons';
import { SongSearcherComponent } from '../../components/song-searcher/song-searcher.component';
import { MostPlayedSectionComponent } from '../../components/most-played-section/most-played-section.component';
import { UserPillComponent } from '../../components/user-pill/user-pill.component';
import { LikedSongsSectionComponent } from '../../components/liked-songs-section/liked-songs-section.component';
import { PlaylistsSectionComponent } from '../../components/playlists-section/playlists-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    UserPillComponent,
    SongSearcherComponent,
    MostPlayedSectionComponent,
    LikedSongsSectionComponent,
    PlaylistsSectionComponent
  ],
  providers: [
    provideIcons({ jamSearch, jamUserCircle }),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
