import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamClose } from '@ng-icons/jam-icons';
import { PlaylistApiService } from '../../services/playlist-api.service';

@Component({
  selector: 'app-delete-playlist',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ jamClose }),
  ],
  templateUrl: './delete-playlist.component.html',
  styleUrl: './delete-playlist.component.scss'
})
export class DeletePlaylistComponent {
  @Input('playlistId') playlistId!: string;

  @Output('delete') deleteEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('close') closeEmitter: EventEmitter<void> = new EventEmitter<void>();

  isSaving: boolean=  false;

  constructor(
    private playlistService: PlaylistApiService,
  ) { }

  onConfirm() {
    this.isSaving = true;
    this.playlistService.deleteOne(this.playlistId).subscribe({
      next: resp => {
        this.deleteEmitter.emit();
      },
      error: err => {
        this.isSaving = false;
      },
    });
  }
  
  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (document.activeElement === document.body) {
      let didNothing = false;
      switch (event.key) {
        case 'Escape':
          this.close();
          break;
        default:
          didNothing = true;
      }
    }
  }

  close() {
    this.closeEmitter.emit();
  }
}
