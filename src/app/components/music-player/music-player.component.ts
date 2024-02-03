import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamHeart, jamHeartF, jamUnorderedList } from '@ng-icons/jam-icons';
import { Song } from '../../interfaces/song';
import { CommonModule } from '@angular/common';
import { MusicPlayerService } from '../../services/music-player.service';
import { VolumeControlComponent } from '../volume-control/volume-control.component';
import { PlaybackControlComponent } from '../playback-control/playback-control.component';
import { RepeatMode } from '../../interfaces/types';
import { Subscription } from 'rxjs';
import { QueueService } from '../../services/queue.service';
import { ShortcutModalComponent } from '../shortcut-modal/shortcut-modal.component';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    PlaybackControlComponent,
    VolumeControlComponent,
    ShortcutModalComponent,
  ],
  providers: [
    provideIcons({ jamHeart, jamHeartF, jamUnorderedList }),
  ],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('playbackControl') playbackControlRef!: PlaybackControlComponent;
  @ViewChild('volumeControl') volumeControlRef!: VolumeControlComponent;

  @Output('like') likeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeSong?: Song;
  subjectSubscriber?: Subscription;
  showingShortcutsModal: boolean = false;

  constructor(
    private musicPlayerService: MusicPlayerService,
    private queueService: QueueService,
  ) { }

  ngOnInit(): void {
    this.subjectSubscriber = this.musicPlayerService.getActiveSong().subscribe(activeSong => {
      if (!activeSong) return;
      this.activeSong = activeSong;
      setTimeout(() => {
        this.playbackControlRef.isPlaying = true;
        this.onPlay();
      });
    });
  }

  ngOnDestroy(): void {
    this.subjectSubscriber?.unsubscribe();
  }

  // Document Pause/Play Listener
  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (document.activeElement === document.body) {
      let didNothing = false;
      if (event.altKey) {
        switch (event.key) {
          case 'ArrowUp':
            this.musicPlayerService.setVolume(this.volume + 10);
            break;
          case 'ArrowDown':
            this.musicPlayerService.setVolume(this.volume - 10);
            break;
          case 'ArrowRight':
            this.playbackControlRef.goNext();
            break;
          case 'ArrowLeft':
            this.playbackControlRef.goPrevious();
            break;
          case 's':
            this.playbackControlRef.toggleShuffle();
            break;
          case 'r':
            this.playbackControlRef.toggleRepeat();
            break;
          case 'm':
            this.volumeControlRef.toggleMute();
            break;
          default:
            didNothing = true;
        }
      } else if (event.shiftKey) {
        switch (event.key) {
          case 'ArrowRight':
            this.onSeek(this.currentTime + 5);
            break;
          case 'ArrowLeft':
            this.onSeek(this.currentTime - 5);
            break;
          case '?':
            this.toggleShortcutsModal();
            break;
          default:
            didNothing = true;
        }
      } else if (event.ctrlKey) {
        // No shortcuts
        didNothing = true;
      } else {
        switch (event.key) {
          case ' ':
            this.playbackControlRef.togglePlay();
            break;
          default:
            didNothing = true;
        }
      }
      if (!didNothing) {
        event.preventDefault();
      }
    }
  }

  toggleShortcutsModal() {
    this.showingShortcutsModal = !this.showingShortcutsModal;
  }

  // Queue
  get showingQueue() {
    return this.queueService.showingQueue;
  }

  toggleQueue() {
    if (this.queueService.showingQueue) {
      this.queueService.hideQueue();
    } else {
      this.queueService.showQueue();
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

  get songDuration() {
    return this.musicPlayerService.songDuration;
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
