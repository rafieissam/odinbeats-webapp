import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamSearch, jamUserCircle } from '@ng-icons/jam-icons';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    MusicPlayerComponent,
  ],
  providers: [provideIcons({ jamSearch, jamUserCircle })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  recents = ['1', '2', '3'];
}
