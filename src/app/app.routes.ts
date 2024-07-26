import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PublicLayoutScreenComponent } from './components/public-layout-screen/public-layout-screen.component';
import { PublicEventPageComponent } from './pages/public-event-page/public-event-page.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './pages/admin/admin-events/admin-events.component';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';
import { AdminExperimentalComponent } from './pages/admin/admin-experimental/admin-experimental.component';
import { CreateEventComponent } from './components/dialog/create-event/create-event.component';
import { UpdateEventComponent } from './components/dialog/update-event/update-event.component';
import { DeleteEventComponent } from './components/dialog/delete-event/delete-event.component';
import { ViewEventComponent } from './components/dialog/view-event/view-event.component';
import { adminGuard } from './guards/admin-guard/admin.guard';
import { AdminAllEventsComponent } from './pages/admin/pages/all-events/all-events.component';
import { EventRegistrationComponent } from './components/event-registration/event-registration.component';
import { AdminAttendingEventsComponent } from './pages/admin/admin-attending-events/admin-attending-events.component';
import { EventRegisteredViewComponent } from './components/dialog/event-registered-view/event-registered-view.component';

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
  { path: 'signup', component: RegisterComponent },
  {
    path: 'admin',

    loadComponent: () =>
      import(
        './components/admin-layout-screen/admin-layout-screen.component'
      ).then((m) => m.AdminLayoutScreenComponent),
    canActivate: [adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'all-events', component: AdminAllEventsComponent },
      { path: 'registered-events', component: AdminAttendingEventsComponent },
      {
        path: 'registered-event-view',
        component: EventRegisteredViewComponent,
      },
      { path: 'registration', component: EventRegistrationComponent },
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
