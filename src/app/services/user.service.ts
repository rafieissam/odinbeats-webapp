import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.API_BASE_URL + '/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getMe() {
    return this.http.get<User>(`${this.API_URL}/me`).pipe(
      tap(user => {
        this.authService.setCurrentUser(user);
      })
    );
  }
}
