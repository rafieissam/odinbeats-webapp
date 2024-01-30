import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamSearch, jamUserCircle } from '@ng-icons/jam-icons';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { Song } from '../../interfaces/song';

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

  song: Song = {
    id: 'uuid',
    name: 'Holier Than Thou',
    image: 'https://img.wynk.in/unsafe/248x248/filters:no_upscale():strip_exif():format(webp)/http://s3-ap-south-1.amazonaws.com/wynk-music-cms/srch_universalmusic/music/update/1617900493/srch_universalmusic_00731451002229-GBF089190020.jpg',
    duration: 227,
    path: 'https://fine.sunproxy.net/file/d1JCdG80TGNMZThNdWJiTnBqdmRselhCUHp0aG1KemJMMmU4TEc1c2lPeVNUbzB5RzJ5d0lXVWJGa1QxVFd4SmVBaEM1THh2M3dUUTh1SlFPalNBZHFMdldIR3E1My9ZT2FENSt5T2pKMVE9/Metallica_-_Holier_Than_Thou_(ColdMP3.com).mp3',
    format: 'mp3',
    artist: 'Metallica',
    album: 'Metallica',
    genre: ['heavy metal', 'metal', 'rock'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
