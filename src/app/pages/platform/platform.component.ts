import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { MusicPlayerService } from '../../services/music-player.service';
import { QueueService } from '../../services/queue.service';
import { UserApiService } from '../../services/user-api.service';
import { SongApiService } from '../../services/song-api.service';
import { PlaylistApiService } from '../../services/playlist-api.service';
import { SongQueueComponent } from '../../components/song-queue/song-queue.component';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    MusicPlayerComponent,
    SongQueueComponent,
  ],
  providers: [
    MusicPlayerService,
    QueueService,
    UserApiService,
    SongApiService,
    PlaylistApiService,
  ],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss'
})
export class PlatformComponent {
  constructor(
    private musicPlayerService: MusicPlayerService,
    private queueService: QueueService,
  ) { }

  get hasSong() {
    return this.musicPlayerService.hasSong;
  }

  get showingQueue() {
    return this.queueService.showingQueue;
  }
}
