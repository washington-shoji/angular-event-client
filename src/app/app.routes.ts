import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PublicLayoutScreenComponent } from './components/public-layout-screen/public-layout-screen.component';
import { AdminLayoutScreenComponent } from './components/admin-layout-screen/admin-layout-screen.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutScreenComponent,
    children: [],
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
