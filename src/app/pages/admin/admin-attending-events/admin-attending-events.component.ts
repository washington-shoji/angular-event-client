import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminRegisteredEventsService } from '../services/admin-registered-events.service';
import { take } from 'rxjs';
import { AdminEventRegisteredComponent } from '../../../components/admin-event-registered/admin-event-registered.component';
import { RegisteredEvent } from '../../../types/event-registered';
import { LoadingIndicatorComponent } from '../../../components/loading-indicator/loading-indicator.component';
import { ErrorAlertComponent } from '../../../components/error-alert/error-alert.component';

@Component({
  selector: 'app-admin-attending-events',
  standalone: true,
  imports: [
    CommonModule,
    AdminEventRegisteredComponent,
    LoadingIndicatorComponent,
    ErrorAlertComponent,
  ],
  providers: [AdminRegisteredEventsService],
  templateUrl: './admin-attending-events.component.html',
  styleUrl: './admin-attending-events.component.scss',
})
export class AdminAttendingEventsComponent implements OnInit {
  registeredEvents: RegisteredEvent[];
  loading: boolean = false;
  errorMessage: string | undefined = undefined;
  constructor(
    private adminAttendingEventsService: AdminRegisteredEventsService
  ) {
    this.registeredEvents = [];
  }

  ngOnInit(): void {
    this.getRegisteredEventsInit();
  }

  getRegisteredEventsInit(): void {
    this.loading = true;

    this.adminAttendingEventsService
      .getRegisteredEvents()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.registeredEvents = data;
          console.warn('data', data);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.errorMessage;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  setErrorDismissed($event: boolean): void {
    if ($event) {
      this.errorMessage = undefined;
      this.getRegisteredEventsInit();
    }

    return;
  }
}
