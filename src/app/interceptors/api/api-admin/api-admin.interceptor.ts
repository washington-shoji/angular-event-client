import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../../pages/auth/auth.service';

export const apiAdminInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const sessionStorage = inject(SessionStorageService);
  const authServiceInstance = inject(AuthService);

  const accessToken = sessionStorage.getData('accessToken');
  const refreshToken = sessionStorage.getData('refreshToken');
  const authService = authServiceInstance;

  let authReq;

  if (
    !(
      req.url.includes('login') ||
      req.url.includes('signup') ||
      req.url.includes('refresh-token') ||
      req.url.includes('amazonaws.com')
    )
  ) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    authReq = req;
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error instanceof HttpErrorResponse &&
        !(
          req.url.includes('login') ||
          req.url.includes('signup') ||
          req.url.includes('refresh-token')
        ) && // <- this will avoid an infinite loop when the accessToken expires.
        error.status === 401
      ) {
        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((refreshedToken) => {
              sessionStorage.saveData(
                'accessToken',
                refreshedToken.accessToken
              );
              authReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${refreshedToken.accessToken}`,
                },
              });
              return next(authReq);
            })
          );
        }
      }
      if (error instanceof HttpErrorResponse && error.status === 403) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
