import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private originalQueue: Song[] = [];
  private queue: Song[] = [];
  private queueSubject: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>(this.queue);
  private queueObservable: Observable<Song[]> = this.queueSubject.asObservable();

  currentIndex: number = 0;
  showingQueue = false;

  constructor() { }

  showQueue() {
    this.showingQueue = true;
  }

  hideQueue() {
    this.showingQueue = false;
  }

  triggerSubject() {
    this.queueSubject.next(this.queue);
  }

  atStart() {
    return this.currentIndex === 0;
  }

  atEnd() {
    return this.currentIndex === this.queue.length - 1;
  }

  getNextSong(): Song | null {
    if (!this.queue.length) return null;
    return this.queue[this.currentIndex + 1];
  }

  getCurrentSong(): Song | null {
    if (!this.queue.length) return null;
    return this.queue[this.currentIndex];
  }

  getPreviousSong(): Song | null {
    if (!this.queue.length) return null;
    return this.queue[this.currentIndex - 1];
  }

  getFirstSong(): Song | null {
    if (!this.queue.length) return null;
    return this.queue[0];
  }

  getLastSong(): Song | null {
    if (!this.queue.length) return null;
    return this.queue[this.queue.length - 1];
  }

  goToIndex(i: number) {
    this.currentIndex = Math.max(0, Math.min(i, this.queue.length - 1));
  }

  goToNext() {
    if (!this.queue.length) return;
    this.goToIndex(this.currentIndex + 1);
  }

  goToPrevious() {
    if (!this.queue.length) return;
    this.goToIndex(this.currentIndex - 1);
  }

  goToFirst() {
    this.goToIndex(0);
  }

  goToLast() {
    this.goToIndex(this.queue.length - 1);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  shuffleQueue() {
    const songsCopy = [...this.queue];
    const beforeCurrentSong = this.shuffleArray(songsCopy.slice(0, this.currentIndex));
    const currentSong = songsCopy[this.currentIndex];
    const afterCurrentSong = this.shuffleArray(songsCopy.slice(this.currentIndex + 1));
    const finalShuffledSongs = beforeCurrentSong.concat([currentSong], afterCurrentSong);
    this.originalQueue = this.queue;
    this.queue = finalShuffledSongs;
    this.triggerSubject();
  }

  unshuffleQueue() {
    let currentSong = this.queue[this.currentIndex];
    let newIndex = 0;
    for (let i = 0; i< this.originalQueue.length; i++) {
      let song = this.originalQueue[i];
      if (song.id == currentSong.id) {
        newIndex = i;
        break;
      }
    }
    this.queue = this.originalQueue;
    this.currentIndex = newIndex;
    this.originalQueue = [];
    this.triggerSubject();
  }
  
  setQueue(songs: Song[]) {
    this.queue = songs;
    this.currentIndex = 0;
    this.triggerSubject();
  }

  getQueue(): Observable<Song[]> {
    return this.queueObservable;
  }
}
