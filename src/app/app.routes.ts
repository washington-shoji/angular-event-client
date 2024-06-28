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
import { CreateEventComponent } from './components/dialog/create-event/create-event.component';
import { UpdateEventComponent } from './components/dialog/update-event/update-event.component';
import { DeleteEventComponent } from './components/dialog/delete-event/delete-event.component';
import { ViewEventComponent } from './components/dialog/view-event/view-event.component';

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
      { path: 'events', component: AdminEventsComponent },
      { path: 'view', component: ViewEventComponent },
      { path: 'create', component: CreateEventComponent },
      { path: 'update', component: UpdateEventComponent },
      { path: 'delete', component: DeleteEventComponent },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'experimental', component: AdminExperimentalComponent },
    ],
  },
];
