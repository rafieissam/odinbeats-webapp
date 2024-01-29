import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  private audioPlayer?: HTMLAudioElement;

  playthrough: number = 0;
  volumePercentage: number = 20;

  constructor() {
    this.initAudioPlayer();
  }

  initAudioPlayer() {
    this.audioPlayer = new Audio();
    this.audioPlayer.preload = "none";
    this.audioPlayer.ontimeupdate = (ev) => {
      if (!this.audioPlayer) return;
      this.playthrough = Math.round(this.audioPlayer.currentTime);
    };
    this.volumePercentage = 100 * this.audioPlayer.volume;
  }

  startOver() {
    this.seek(0);
    this.play();
  }
  
  setRepeatOnce() {
    if (!this.audioPlayer) return;
    this.audioPlayer.onended = () => {
      this.startOver();
    };
  }

  setSongPath(path: string) {
    if (!this.audioPlayer) {
      this.initAudioPlayer();
      this.setSongPath(path);
      return;
    }
    this.audioPlayer.src = path;
  }

  play() {
    if (!this.audioPlayer || !this.audioPlayer.src) return;
    this.audioPlayer.play();
  }

  pause() {
    if (!this.audioPlayer || !this.audioPlayer.src) return;
    this.audioPlayer.pause();
  }

  setVolume(volumePercentage: number) {
    if (!this.audioPlayer) return;
    this.volumePercentage = Math.max(0, Math.min(100, volumePercentage));
    this.audioPlayer.volume = volumePercentage / 100;
  }

  seek(time: number) {
    if (!this.audioPlayer) return;
    this.audioPlayer.currentTime = time;
  }

}
