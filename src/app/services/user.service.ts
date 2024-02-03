import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:3000/users';

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
