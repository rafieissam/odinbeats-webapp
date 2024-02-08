import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamHome, jamHomeF, jamHeart, jamHeartF, jamBook, jamBookF } from '@ng-icons/jam-icons';

@Component({
  selector: 'app-bottombar',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    RouterModule,
  ],
  providers: [
    provideIcons({ jamHome, jamHomeF, jamHeart, jamHeartF, jamBook, jamBookF })
  ],
  templateUrl: './bottombar.component.html',
  styleUrl: './bottombar.component.scss'
})
export class BottombarComponent {
  routes = [
    { route: '', icon: 'jamHome', activeIcon: 'jamHomeF' },
    { route: 'likes', icon: 'jamHeart', activeIcon: 'jamHeartF' },
    { route: 'library', icon: 'jamBook', activeIcon: 'jamBookF' },
  ];

}
