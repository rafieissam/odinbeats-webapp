import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class MusicPlayerComponent implements OnInit, OnChanges {
  @Input('song') inputSong!: Song;
  @Output('like') likeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeSong?: Song;

  constructor(private musicPlayerService: MusicPlayerService) { }

  ngOnInit(): void {
    this.setSong();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeSong']) {
      let song: Song = changes['activeSong'].currentValue;
      this.setSong(song);
    }
  }

  setSong(song: Song = this.inputSong) {
    this.activeSong = song;
    if (this.activeSong) {
      this.musicPlayerService.setSongPath(this.activeSong.path);
    }
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
    if (this.activeSong?.hasOwnProperty('isLiked')) {
      this.activeSong.isLiked = true;
      this.likeChange.emit(this.activeSong.isLiked);
    }
  }

  unlike() {
    if (this.activeSong?.hasOwnProperty('isLiked')) {
      this.activeSong.isLiked = false;
      this.likeChange.emit(this.activeSong.isLiked);
    }
  }
}
