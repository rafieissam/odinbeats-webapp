import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

type SignupDto = {
  name: string;
  email: string;
  password: string;
};

type SigninDto = {
  email: string;
  password: string;
};

type ApiResponse<T> = {
  error?: boolean;
  message: string;
  results: T; 
}

type AuthResp = {
  accessToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.API_BASE_URL + '/auth';
  private localStorageJwtPath = 'authjot';
  private currentUser?: User;
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.setIsLoggedIn();
  }

  signup(dto: SignupDto) {
    return this.http.post<ApiResponse<AuthResp>>(`${this.API_URL}/signup`, dto, { withCredentials: true }).pipe(
      map(resp => {
        const results = resp.results;
        this.handleSignin(results);
        return results.user
      })
    );
  }

  signin(dto: SigninDto) {
    return this.http.post<ApiResponse<AuthResp>>(`${this.API_URL}/signin`, dto, { withCredentials: true }).pipe(
      map(resp => {
        const results = resp.results;
        this.handleSignin(results);
        return results.user
      })
    );
  }

  refreshToken() {
    return this.http.post<ApiResponse<AuthResp>>(`${this.API_URL}/refresh-token`, {}, { withCredentials: true }).pipe(
      map(resp => {
        const results = resp.results;
        this.handleSignin(results);
        return results.user
      })
    );
  }

  signout() {
    this.removeCurrentUser();
    this.unsetAccessToken();
    this.router.navigateByUrl('/login');
  }

  handleSignin(resp: AuthResp) {
    this.setCurrentUser(resp.user);
    this.setAccessToken(resp.accessToken);
  }

  setIsLoggedIn() {
    this.isLoggedIn = !!this.getAccessToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.localStorageJwtPath);
  }

  private setAccessToken(accessToken: string) {
    localStorage.setItem(this.localStorageJwtPath, accessToken);
    this.setIsLoggedIn();
  }

  private unsetAccessToken() {
    localStorage.removeItem(this.localStorageJwtPath);
    this.setIsLoggedIn();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  removeCurrentUser() {
    this.currentUser = undefined;
  }

}
