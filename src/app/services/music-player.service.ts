import { Injectable } from '@angular/core';
import { RepeatMode } from '../interfaces/types';
import { Song } from '../interfaces/song';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { QueueService } from './queue.service';
import { Playlist } from '../interfaces/playlist';
import { SongApiService } from './song-api.service';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private audioPlayer?: HTMLAudioElement;
  private activeSong?: Song;
  private activeSongSubject: BehaviorSubject<Song | undefined> = new BehaviorSubject<Song | undefined>(this.activeSong);
  private activeSongObservable: Observable<Song | undefined> = this.activeSongSubject.asObservable();
  private queue: Song[] = [];

  activePlaylistId?: string;
  activeSongId?: string;

  currentTime: number = 0;
  volume: number = 50;
  isMuted: boolean = false;

  repeatMode: RepeatMode = "off";
  isShuffling: boolean = false;

  constructor(
    private queueService: QueueService,
    private songService: SongApiService,
  ) {
    this.initAudioPlayer();
    this.monitorQueueChanges();
  }

  get hasSong() {
    return this.activeSong ? true : false;
  }

  get songDuration() {
    return this.audioPlayer ? Math.floor(this.audioPlayer.duration) : 0;
  }

  initAudioPlayer() {
    this.audioPlayer = new Audio();
    this.audioPlayer.preload = "auto";
    this.audioPlayer.ontimeupdate = (ev) => {
      if (!this.audioPlayer) return;
      this.currentTime = Math.floor(this.audioPlayer.currentTime);
    };
    this.audioPlayer.onended = this.next;
    this.volume = 100 * this.audioPlayer.volume;
  }

  monitorQueueChanges() {
    this.queueService.getQueue().subscribe(queue => {
      this.queue = queue;
    });
  }

  startPlaylist(playlist: Playlist, index: number = 0) {
    if (!playlist.songs?.length) return;
    let songs = playlist.songs.map(playlistSong => playlistSong.song);
    this.activePlaylistId = playlist.id;
    this.queueService.setQueue(songs);
    this.startSong(songs[index]);
    this.queueService.goToIndex(index);
    if (this.isShuffling) {
      this.queueService.shuffleQueue();
    }
  }

  startStandaloneSong(song: Song) {
    this.startSong(song);
    if (this.activeSong) {
      this.queueService.setQueue([this.activeSong]);
    }
  }

  startSong(song: Song) {;
    this.activeSong = { ...song };
    this.activeSongId = song.id;
    this.setSongPath(this.activeSong.path);
    firstValueFrom(this.songService.registerPlay(this.activeSongId));
    this.activeSongSubject.next(this.activeSong);
  }

  getActiveSong(): Observable<Song | undefined> {
    return this.activeSongObservable;
  }

  setSongPath(path: string) {
    if (!this.audioPlayer) {
      this.initAudioPlayer();
      this.setSongPath(path);
      return;
    }
    this.currentTime = 0;
    this.audioPlayer.currentTime = 0;
    this.audioPlayer.src = path;
  }

  setVolume(volume: number) {
    if (!this.audioPlayer) return;
    this.volume = Math.max(0, Math.min(100, volume));
    this.audioPlayer.volume = this.volume / 100;
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
  }

  setShuffle(state: boolean) {
    this.isShuffling = state;
    if (this.isShuffling) {
      this.queueService.shuffleQueue();
    } else {
      this.queueService.unshuffleQueue();
    }
  }

  setRepeatMode(repeatMode: RepeatMode) {
    this.repeatMode = repeatMode;
    if (this.repeatMode != "off" && this.audioPlayer) {
      if (this.currentTime >= Math.floor(this.audioPlayer.duration)) {
        this.currentTime = 0;
        setTimeout(() => {
          this.next();
        }, 1000);
      }
    }
  }

  play() {
    if (!this.audioPlayer || !this.audioPlayer.src) return;
    this.audioPlayer.play();
  }

  pause() {
    if (!this.audioPlayer || !this.audioPlayer.src) return;
    this.audioPlayer.pause();
  }

  seek(time: number) {
    if (!this.audioPlayer) return;
    this.audioPlayer.currentTime = time;
    if (time >= Math.floor(this.audioPlayer.duration)) {
      this.currentTime = 0;
      setTimeout(() => {
        this.next();
      }, 1000);
    }
  }

  next() {
    if (!this.queue?.length) return;
    let song;
    if (this.queueService.atEnd()) {
      if (this.repeatMode == "all") {
        song = this.queueService.getFirstSong();
        this.queueService.goToFirst();
      } else if (this.repeatMode == "off") {
        this.pause();
      }
    } else {
      song = this.queueService.getNextSong();
      this.queueService.goToNext();
    }
    if (song) {
      this.startSong(song);
    }
  }

  prev() {
    if (this.audioPlayer && this.audioPlayer.currentTime > 3) {
      this.seek(0);
    } else if (this.queue.length) {
      let song;
      if (this.queueService.atStart()) {
        if (this.repeatMode == "all") {
          song = this.queueService.getLastSong();
          this.queueService.goToLast();
        } else if (this.repeatMode == "off") {
          this.seek(0);
        }
      } else {
        song = this.queueService.getPreviousSong();
        this.queueService.goToPrevious();
      }
      if (song) {
        this.startSong(song);
      }
    }
  }

}
