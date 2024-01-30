import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private audioPlayer?: HTMLAudioElement;

  currentTime: number = 0;
  volume: number = 50;
  isMuted: boolean = false;

  repeatMode: "all" | "one" | "off" = "off";
  isShuffling: boolean = false;

  constructor() {
    this.initAudioPlayer();
  }

  initAudioPlayer() {
    this.audioPlayer = new Audio();
    this.audioPlayer.preload = "none";
    this.audioPlayer.ontimeupdate = (ev) => {
      if (!this.audioPlayer) return;
      this.currentTime = Math.round(this.audioPlayer.currentTime);
    };
    this.volume = 100 * this.audioPlayer.volume;
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

  setVolume(volume: number) {
    if (!this.audioPlayer) return;
    this.volume = Math.max(0, Math.min(100, volume));
    this.audioPlayer.volume = this.volume / 100;
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
  }

  seek(time: number) {
    if (!this.audioPlayer) return;
    this.audioPlayer.currentTime = time;
  }

  setShuffle(state: boolean) {
    this.isShuffling = state;
  }

  setRepeatMode(repeatMode: typeof this.repeatMode) {
    this.repeatMode = repeatMode;
    let endFunc;
    switch (this.repeatMode) {
      case "all":
        // To Update
        endFunc = () => {};
        break;
      case "one":
        endFunc = this.startOver;
        break;
      case "off":
        endFunc = this.next;
        break;
    }
    if (!this.audioPlayer) return;
    this.audioPlayer.onended = endFunc;
  }

  next() {
    // To Update
  }

  prev() {
    if (this.audioPlayer && this.currentTime < this.audioPlayer?.duration) {
      this.seek(0);
    } else {
      // To Update
    }
  }

  startOver() {
    this.seek(0);
    this.play();
  }

}
