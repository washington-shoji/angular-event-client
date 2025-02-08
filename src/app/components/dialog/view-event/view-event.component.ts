import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppEventRequest } from '../../../types/event-all-info';
import { AdminEventService } from '../../../pages/admin/services/admin-event.service';
import { take } from 'rxjs';
import { AppEvent } from '../../../types/event';
import { ErrorAlertComponent } from '../../error-alert/error-alert.component';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';

type RouteState = {
  event: AppEvent;
  navigationId: number;
};

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [CommonModule, ErrorAlertComponent, LoadingIndicatorComponent],
  providers: [AdminEventService],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.scss',
})
export class ViewEventComponent implements OnInit {
  eventId: string | undefined;
  event: AppEventRequest | undefined;
  loading: boolean = false;
  errorMessage: string | undefined = undefined;

  constructor(
    private router: Router,
    private location: Location,
    private adminEventService: AdminEventService
  ) {}

  ngOnInit(): void {
    this.eventInit();
  }

  eventInit(): void {
    const state = this.location.getState() as RouteState;
    this.eventId = state.event.event_id;

    if (!this.eventId) {
      this.router.navigate(['admin', 'events']);
      return;
    }

    this.loading = true;
    this.adminEventService
      .getUserEventAllInfoById(this.eventId)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.event = data;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.message;
          console.error('Error', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  navigateEdit(): void {
    this.router.navigate(['admin', 'update'], {
      state: { eventId: this.eventId },
    });
  }

  delete(): void {
    this.router.navigate(['admin', 'delete'], {
      state: { event: this.event },
    });
  }

  dismiss(): void {
    this.router.navigate(['admin', 'events']);
  }

  dismissError($event: boolean) {
    if ($event) {
      this.errorMessage = undefined;
      this.eventInit();
    }
  }
}
