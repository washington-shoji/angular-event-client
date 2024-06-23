import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PublicLayoutScreenComponent } from './components/public-layout-screen/public-layout-screen.component';
import { AdminLayoutScreenComponent } from './components/admin-layout-screen/admin-layout-screen.component';
import { PublicEventPageComponent } from './pages/public-event-page/public-event-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutScreenComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'public-events' },
      { path: 'public-events', component: PublicEventPageComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminLayoutScreenComponent,
    children: [],
  },
];
