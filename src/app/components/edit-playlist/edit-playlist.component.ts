import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamClose } from '@ng-icons/jam-icons';
import { PlaylistApiService } from '../../services/playlist-api.service';
import { Playlist } from '../../interfaces/playlist';

@Component({
  selector: 'app-edit-playlist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ jamClose }),
  ],
  templateUrl: './edit-playlist.component.html',
  styleUrl: './edit-playlist.component.scss'
})
export class EditPlaylistComponent implements OnInit {
  @Input('playlist') inputPlaylist!: Playlist;

  @Output('save') saveEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('close') closeEmitter: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup;
  errorMsg?: string;
  isSaving: boolean = false;

  constructor(
    private playlistService: PlaylistApiService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.inputPlaylist.name, Validators.required),
    });
  }

  onSubmit() {
    this.form.disable();
    const formValue = this.form.value;
    let updateDto = {
      name: formValue.name,
    };
    this.isSaving = true;
    this.playlistService.updateOne(this.inputPlaylist.id, updateDto).subscribe({
      next: resp => {
        this.saveEmitter.emit(updateDto);
      },
      error: err => {
        this.isSaving = false;
        this.form.enable();
      },
    });
  }

  trackErrors() {
    let msg = undefined;
    const controls = this.form.controls;
    for (let key in controls) {
      const control = controls[key];
      if (control.dirty && control.errors != null) {
        const error_key = Object.keys(control.errors)[0];
        let name = (key.charAt(0).toUpperCase() + key.substr(1).toLowerCase()).split('_').join(' ');
        let error = control.errors[error_key];
        msg = this.getErrorMessage(error_key, error, name);
        break;
      }
    }
    this.errorMsg = msg;
  }

  getErrorMessage(error_key: string, error?: any, name?: string) {
    let msg = 'Validation error!';
    switch (error_key) {
      case 'required': msg = `${name} is required!`; break;
    }
    return msg;
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
