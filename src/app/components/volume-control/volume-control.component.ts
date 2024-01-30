import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamVolumeDown, jamVolumeUp, jamVolume, jamVolumeMute } from '@ng-icons/jam-icons';

@Component({
  selector: 'app-volume-control',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ jamVolumeDown, jamVolumeUp, jamVolume, jamVolumeMute }),
  ],
  templateUrl: './volume-control.component.html',
  styleUrl: './volume-control.component.scss'
})
export class VolumeControlComponent {
  private readonly defaultVolume = 50;

  @ViewChild('volumeBar') volumeBarRef!: ElementRef;

  @Input('volume') volumePercentage: number = this.defaultVolume;
  @Output('volume') volumeChange: EventEmitter<number> = new EventEmitter<number>();
  @Input('mute') isMuted: boolean = false;
  @Output('mute') muteChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private isDragging = false;
  private tempVolume?: number;
  
  @HostListener('document:mouseup', ['$event'])
  onHostMouseUp(event: MouseEvent): void {
    this.onMouseUp();
  }
  
  @HostListener('document:mousemove', ['$event'])
  onHostMouseMove(event: MouseEvent): void {
    this.onMouseMove(event);
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.updateVolume(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.updateVolume(event);
    }
  }

  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }

  toggleMute() {
    if (this.isMuted) {
      this.volumePercentage = this.tempVolume || this.defaultVolume;
      this.setVolume(this.volumePercentage);
      this.setMute(false);
    } else {
      this.tempVolume = this.volumePercentage;
      this.setVolume(0);
      this.setMute(true);
    }
  }

  updateVolume(event: MouseEvent): void {
    const volumeBar = this.volumeBarRef.nativeElement as HTMLElement;
    const rect = volumeBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;

    if (this.isMuted) this.setMute(false);
    let newVolume = Math.max(0, Math.min(100, percentage));
    this.setVolume(newVolume);
  }

  setVolume(volume: number) {
    this.volumeChange.emit(volume);
  }

  setMute(state: boolean) {
    this.muteChange.emit(state);
  }
  
}
