import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SessionStorageService } from './services/session-storage/session-storage.service';
import { apiAdminInterceptor } from './interceptors/api/api-admin/api-admin.interceptor';
import { AuthService } from './pages/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiAdminInterceptor])),
    SessionStorageService,
    AuthService,
  ],
};
