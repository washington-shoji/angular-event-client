import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionStorage = inject(SessionStorageService);

  const accessToken = sessionStorage.getData('accessToken');
  const refreshToken = sessionStorage.getData('refreshToken');

  if (!accessToken && !refreshToken) {
    router.navigate(['login']);
    return false;
  }

  return true;
};
