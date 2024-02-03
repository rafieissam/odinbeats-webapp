import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const userResolver: ResolveFn<boolean> = async (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const accessToken = authService.getAccessToken();
  if (accessToken && !authService.getCurrentUser()) {
    await firstValueFrom(userService.getMe());
  }
  return true;
};
