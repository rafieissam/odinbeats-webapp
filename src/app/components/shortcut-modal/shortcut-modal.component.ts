import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamClose } from '@ng-icons/jam-icons';

@Component({
  selector: 'app-shortcut-modal',
  standalone: true,
  imports: [
    NgIconComponent,
  ],
  providers: [
    provideIcons({ jamClose }),
  ],
  templateUrl: './shortcut-modal.component.html',
  styleUrl: './shortcut-modal.component.scss'
})
export class ShortcutModalComponent {
  @Output('close') closeEmitter: EventEmitter<void> = new EventEmitter<void>();

  shortcuts = [
    { id: 1, name: 'Toggle Pause/Play', key: 'Space' },
    { id: 2, name: 'Next Song', key: 'Alt + &#8594;' },
    { id: 3, name: 'Previous Song', key: 'Alt + &#8592;' },
    { id: 4, name: 'Raise Volume', key: 'Alt + &#8593;' },
    { id: 5, name: 'Lower Volume', key: 'Alt + &#8595;' },
    { id: 6, name: 'Toggle Shuffle', key: 'Alt + S' },
    { id: 7, name: 'Toggle Repeat', key: 'Alt + R' },
    { id: 8, name: 'Toggle Mute', key: 'Alt + M' },
    { id: 9, name: 'Seek Forward', key: 'Shift + &#8594;' },
    { id: 10, name: 'Seek Backward', key: 'Shift + &#8592;' },
    { id: 11, name: 'Open Shortcuts Menu', key: '?' },
  ];
  
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
