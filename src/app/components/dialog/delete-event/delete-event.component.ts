import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AdminEventService } from '../../../pages/admin/services/admin-event.service';
import { take } from 'rxjs';
import { ErrorAlertComponent } from '../../error-alert/error-alert.component';
import { AppEvent } from '../../../types/event';

type RouteState = {
  event: AppEvent;
  navigationId: number;
};

@Component({
  selector: 'app-delete-event',
  standalone: true,
  imports: [ErrorAlertComponent],
  providers: [AdminEventService],
  templateUrl: './delete-event.component.html',
  styleUrl: './delete-event.component.scss',
})
export class DeleteEventComponent implements OnInit {
  event: AppEvent | undefined;
  submitting: boolean = false;
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
    this.event = state.event;

    if (!state.event) {
      this.router.navigate(['admin', 'events']);
    }
  }

  submit(): void {
    if (!this.event?.event_id) return;
    this.submitting = true;

    this.adminEventService
      .deleteEvent(this.event.event_id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.router.navigate(['admin', 'events']);
        },
        error: (error) => {
          this.submitting = false;
          this.errorMessage = error.errorMessage;
        },
        complete: () => {
          this.submitting = false;
        },
      });
  }

  dismissError($event: boolean) {
    if ($event) {
      this.errorMessage = undefined;
    }
  }

  dismiss(): void {
    this.router.navigate(['admin', 'events']);
  }
}
