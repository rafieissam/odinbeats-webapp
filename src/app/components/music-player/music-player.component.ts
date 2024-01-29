import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamHeart, jamHeartF, jamPlay, jamPause, jamVolumeDown, jamVolumeUp, jamVolume, jamVolumeMute, jamSetForward, jamSetBackward, jamShuffle, jamRepeat } from '@ng-icons/jam-icons';
import { Song } from '../../interfaces/song';
import { CommonModule } from '@angular/common';
import { MusicPlayerService } from '../../services/music-player.service';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    DurationToMinsPipe,
  ],
  providers: [
    provideIcons({ jamHeart, jamHeartF, jamPlay, jamPause, jamVolumeDown, jamVolumeUp, jamVolume, jamVolumeMute, jamSetForward, jamSetBackward, jamShuffle, jamRepeat }),
  ],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent implements OnInit {
  @ViewChild('seekBar') seekBarRef!: ElementRef;
  @ViewChild('volumeBar') volumeBarRef!: ElementRef;

  isPlaying = false;
  isShuffled = false;
  isRepeating = false;
  isRepeatingOnce = false;

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

  get playthroughDuration(): number {
    return this.tempSeek || this.musicPlayerService.playthrough;
  }

  get playthroughPercentage(): number {
    if (!this.playthroughDuration || !this.activeSong?.duration) return 0;
    return 100 * this.playthroughDuration / this.activeSong?.duration;
  }

  get volumePercentage(): number {
    return this.musicPlayerService.volumePercentage;
  }

  isMuted: any = false;
  toggleMute() {
    if (this.isMuted) {
      this.musicPlayerService.setVolume(this.isMuted);
      this.isMuted = false;
    } else {
      this.isMuted = this.volumePercentage;
      this.musicPlayerService.setVolume(0);
    }
  }

  isDragging = false;
  onVolumeMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.updateVolume(event);
  }

  onVolumeMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.updateVolume(event);
    }
  }

  onVolumeMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }

  isSeeking = false;
  tempSeek: any = false;
  onSeekMouseDown(event: MouseEvent) {
    this.isSeeking = true;
    this.updateSeek(event);
  }

  onSeekMouseMove(event: MouseEvent) {
    if (this.isSeeking) {
      this.updateSeek(event);
    }
  }

  onSeekMouseUp() {
    if (this.isSeeking) {
      this.isSeeking = false;
      this.musicPlayerService.seek(this.tempSeek);
      this.tempSeek = false;
    }
  }
  
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.onVolumeMouseUp();
    this.onSeekMouseUp();
  }
  
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.onVolumeMouseMove(event);
    this.onSeekMouseMove(event);
  }

  updateVolume(event: MouseEvent): void {
    const volumeBar = this.volumeBarRef.nativeElement as HTMLElement;
    const rect = volumeBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;

    let currentVolume = Math.max(0, Math.min(100, percentage));
    this.musicPlayerService.setVolume(currentVolume);
    if (this.isMuted) this.isMuted = false;
  }

  updateSeek(event: MouseEvent): void {
    if (!this.activeSong) return;
    const seekBar = this.seekBarRef.nativeElement as HTMLElement;
    const rect = seekBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;

    this.tempSeek = Math.round(Math.max(0, Math.min(100, percentage)) * this.activeSong?.duration / 100);
  }

  like() {
    if (this.activeSong?.hasOwnProperty('isLiked'))
      this.activeSong.isLiked = true;
  }

  unlike() {
    if (this.activeSong?.hasOwnProperty('isLiked'))
      this.activeSong.isLiked = false;
  }

  togglePlay() {
    if (this.isPlaying) {
      this.musicPlayerService.pause();
    } else {
      this.musicPlayerService.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
  }

  toggleRepeat() {
    if (this.isRepeating) {
      this.isRepeatingOnce = true;
      this.isRepeating = false;
    } else if (this.isRepeatingOnce) {
      this.isRepeatingOnce = false;
    } else {
      this.isRepeating = true;
    }

    if (this.isRepeatingOnce) {
      this.musicPlayerService.setRepeatOnce();
    }
  }

  inQueue = false;
  goPrevious() {
    if (this.playthroughDuration >= 2) {
      this.musicPlayerService.startOver();
    } else if (this.inQueue) {
      // 
    }
  }

  goNext() {
    if (this.inQueue) {
      // 
    }
  }
}
