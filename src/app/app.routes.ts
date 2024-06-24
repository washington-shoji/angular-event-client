import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PublicLayoutScreenComponent } from './components/public-layout-screen/public-layout-screen.component';
import { AdminLayoutScreenComponent } from './components/admin-layout-screen/admin-layout-screen.component';
import { PublicEventPageComponent } from './pages/public-event-page/public-event-page.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './pages/admin/admin-events/admin-events.component';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';
import { AdminExperimentalComponent } from './pages/admin/admin-experimental/admin-experimental.component';
import { CreateEventDialogComponent } from './components/dialog/create-event-dialog/create-event-dialog.component';
import { UpdateEventDialogComponent } from './components/dialog/update-event-dialog/update-event-dialog.component';
import { DeleteEventDialogComponent } from './components/dialog/delete-event-dialog/delete-event-dialog.component';

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
    component: AdminLayoutScreenComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: AdminDashboardComponent },
      {
        path: 'admin-events',
        component: AdminEventsComponent,
        children: [
          { path: 'create/:id', component: CreateEventDialogComponent },
          { path: 'update/:id', component: UpdateEventDialogComponent },
          { path: 'delete/:id', component: DeleteEventDialogComponent },
        ],
      },
      { path: 'admin-profile', component: AdminProfileComponent },
      { path: 'admin-experimental', component: AdminExperimentalComponent },
    ],
  },
];
