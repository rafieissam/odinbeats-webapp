import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamClose, jamDisc } from '@ng-icons/jam-icons';
import { Subscription } from 'rxjs';
import { MusicPlayerService } from '../../services/music-player.service';
import { QueueService } from '../../services/queue.service';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-song-queue',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    DurationToMinsPipe,
  ],
  providers: [
    provideIcons({ jamClose, jamDisc }),
  ],
  templateUrl: './song-queue.component.html',
  styleUrl: './song-queue.component.scss'
})
export class SongQueueComponent implements OnInit, OnDestroy {
  queueSubscription?: Subscription;
  queue: Song[] = [];
  
  constructor(
    private queueService: QueueService,
    private musicPlayerService: MusicPlayerService,
  ) { }

  ngOnInit(): void {
    this.monitorQueueChanges();
  }

  ngOnDestroy(): void {
    this.queueSubscription?.unsubscribe();
  }

  get currentIndex() {
    return this.queueService.currentIndex;
  }

  monitorQueueChanges() {
    this.queueSubscription = this.queueService.getQueue().subscribe(queue => {
      this.queue = queue;
    });
  }

  hideQueue() {
    this.queueService.hideQueue();
  }

  playSong(song: Song) {
    let index!: number;
    for (let i = 0; i < this.queue.length; i++) {
      let s = this.queue[i];
      if (s.id == song.id) {
        index = i;
        break;
      }
    }
    this.musicPlayerService.startSong(song);
    this.queueService.goToIndex(index);
  }
}
