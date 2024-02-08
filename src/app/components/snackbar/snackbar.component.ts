import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent implements OnInit, OnDestroy {

  snackbarDuration = 2000;
  subscription?: Subscription;
  isShowing = false;
  message: string = '';
  timeoutId?: any;

  constructor(
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.snackbarService.watchMessages().subscribe(message => {
      if (this.isShowing) {
        clearTimeout(this.timeoutId);
      }
      this.showMessage(message);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showMessage(message: string) {
    this.message = message;
    this.isShowing = true;
    this.timeoutId = setTimeout(() => {
      this.removeMessage();
    }, this.snackbarDuration);
  }

  removeMessage() {
    this.isShowing = false;
  }
}
