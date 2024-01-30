import { Component, HostListener, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamHeart, jamHeartF } from '@ng-icons/jam-icons';
import { Song } from '../../interfaces/song';
import { CommonModule } from '@angular/common';
import { MusicPlayerService } from '../../services/music-player.service';
import { VolumeControlComponent } from '../volume-control/volume-control.component';
import { PlaybackControlComponent } from '../playback-control/playback-control.component';
import { RepeatMode } from '../../interfaces/types';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    PlaybackControlComponent,
    VolumeControlComponent,
  ],
  providers: [
    provideIcons({ jamHeart, jamHeartF }),
  ],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent implements OnInit {
  activeSong?: Song;

  constructor(private musicPlayerService: MusicPlayerService) { }

  ngOnInit(): void {
    let song: Song = {
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
    this.activeSong = song;
    this.musicPlayerService.setSongPath(song.path);
  }

  // Volume Control
  get volume(): number {
    return this.musicPlayerService.volume;
  }

  get isMuted(): boolean {
    return this.musicPlayerService.isMuted;
  }

  onChangeVolume(newVolume: number) {
    this.musicPlayerService.setVolume(newVolume);
  }

  onChangeMute(newMute: boolean) {
    this.musicPlayerService.setMute(newMute);
  }

  // Playback Control
  get currentTime() {
    return this.musicPlayerService.currentTime;
  }

  onPlay() {
    this.musicPlayerService.play();
  }

  onPause() {
    this.musicPlayerService.pause();
  }

  onNext() {
    this.musicPlayerService.next();
  }

  onPrev() {
    this.musicPlayerService.prev();
  }

  onShuffle(state: boolean) {
    this.musicPlayerService.setShuffle(state);
  }

  onRepeat(repeatMode: RepeatMode) {
    this.musicPlayerService.setRepeatMode(repeatMode);
  }

  onSeek(newTime: number) {
    this.musicPlayerService.seek(newTime);
  }

  // Like Actions
  like() {
    if (this.activeSong?.hasOwnProperty('isLiked'))
      this.activeSong.isLiked = true;
  }

  unlike() {
    if (this.activeSong?.hasOwnProperty('isLiked'))
      this.activeSong.isLiked = false;
  }
}
