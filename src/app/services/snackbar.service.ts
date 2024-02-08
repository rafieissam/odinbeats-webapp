import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private msgSubj: Subject<string> = new Subject<string>();
  private msgObservable: Observable<string> = this.msgSubj.asObservable();

  constructor() { }

  showMessage(msg: string) {
    this.msgSubj.next(msg);
  }

  watchMessages() {
    return this.msgObservable;
  }
}
