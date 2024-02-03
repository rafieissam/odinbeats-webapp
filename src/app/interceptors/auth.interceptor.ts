import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  req = appendAuthHeader(req, authService);

  let isRefreshing = false;
  return next(req).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401
      ) {
        isRefreshing = true;
        return authService.refreshToken().pipe(
          switchMap(resp => {
            isRefreshing = false;
            req = appendAuthHeader(req, authService);
            return next(req);
          }),
          catchError(error => {
            isRefreshing = false;
            if (error.status == 403) {
              authService.signout();
            }
            return throwError(() => error);
          })
        )
      }
      return throwError(() => error);
    })
  );
};

const appendAuthHeader = (req: any, authService: any) => {
  return req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authService.getAccessToken()),
    withCredentials: true,
  });
};