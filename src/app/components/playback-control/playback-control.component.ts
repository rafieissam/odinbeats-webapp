import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamPlay, jamPause, jamVolumeDown, jamVolumeUp, jamVolume, jamVolumeMute, jamSetForward, jamSetBackward, jamShuffle, jamRepeat } from '@ng-icons/jam-icons';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { RepeatMode } from '../../interfaces/types';

@Component({
  selector: 'app-playback-control',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    DurationToMinsPipe,
  ],
  providers: [
    provideIcons({ jamPlay, jamPause, jamVolumeDown, jamVolumeUp, jamVolume, jamVolumeMute, jamSetForward, jamSetBackward, jamShuffle, jamRepeat }),
  ],
  templateUrl: './playback-control.component.html',
  styleUrl: './playback-control.component.scss'
})
export class PlaybackControlComponent {
  @ViewChild('seekBar') seekBarRef!: ElementRef;

  @Input('currentTime') currentTime: number = 0;
  @Input('songDuration') songDuration: number = 0;
  @Output('play') playTrigger: EventEmitter<void> = new EventEmitter<void>();
  @Output('pause') pauseTrigger: EventEmitter<void> = new EventEmitter<void>();
  @Output('next') nextTrigger: EventEmitter<void> = new EventEmitter<void>();
  @Output('prev') prevTrigger: EventEmitter<void> = new EventEmitter<void>();
  @Output('shuffle') shuffleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('repeat') repeatChange: EventEmitter<RepeatMode> = new EventEmitter<RepeatMode>();
  @Output('seek') seekChange: EventEmitter<number> = new EventEmitter<number>();

  private isSeeking = false;
  private tempSeek?: number;

  isPlaying = false;
  isShuffling = false;
  isRepeating = false;
  isRepeatingOne = false;

  get currentTimeInternal(): number {
    return this.tempSeek || this.currentTime;
  }

  get currentTimePercent(): number {
    if (!this.currentTimeInternal || !this.songDuration) return 0;
    return 100 * this.currentTimeInternal / this.songDuration;
  }
  
  @HostListener('document:mouseup', ['$event'])
  onHostMouseUp(event: MouseEvent): void {
    this.onMouseUp();
  }
  
  @HostListener('document:mousemove', ['$event'])
  onHostMouseMove(event: MouseEvent): void {
    this.onMouseMove(event);
  }
  
  onMouseDown(event: MouseEvent) {
    this.isSeeking = true;
    this.updateSeek(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isSeeking) {
      this.updateSeek(event);
    }
  }

  onMouseUp() {
    if (this.isSeeking) {
      this.isSeeking = false;
      this.setSeek(this.tempSeek);
      this.tempSeek = undefined;
    }
  }

  updateSeek(event: MouseEvent): void {
    const seekBar = this.seekBarRef.nativeElement as HTMLElement;
    const rect = seekBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    this.tempSeek = Math.round(Math.max(0, Math.min(100, percentage)) * this.songDuration / 100);
  }

  setSeek(time: number = 0) {
    this.seekChange.emit(time);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pauseTrigger.emit();
    } else {
      this.playTrigger.emit();
    }
    this.isPlaying = !this.isPlaying;
  }

  toggleShuffle() {
    this.isShuffling = !this.isShuffling;
    this.shuffleChange.emit(this.isShuffling);
  }

  toggleRepeat() {
    if (this.isRepeating) {
      this.isRepeatingOne = true;
      this.isRepeating = false;
      this.repeatChange.emit("one");
    } else if (this.isRepeatingOne) {
      this.isRepeatingOne = false;
      this.repeatChange.emit("off");
    } else {
      this.isRepeating = true;
      this.repeatChange.emit("all");
    }
  }

  goPrevious() {
    this.prevTrigger.emit();
  }

  goNext() {
    this.nextTrigger.emit();
  }
}
