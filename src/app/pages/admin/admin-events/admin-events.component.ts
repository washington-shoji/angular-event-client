import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TableComponent } from '../../../components/table/table/table.component';
import { AdminEventService } from '../services/admin-event.service';
import { AppEvent } from '../../../types/event';
import { LoadingIndicatorComponent } from '../../../components/loading-indicator/loading-indicator.component';
import { ErrorAlertComponent } from '../../../components/error-alert/error-alert.component';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [TableComponent, LoadingIndicatorComponent, ErrorAlertComponent],
  providers: [AdminEventService],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss',
})
export class AdminEventsComponent implements OnInit {
  events: AppEvent[] = [];
  loading: boolean = false;
  errorMessage: string | undefined = undefined;
  constructor(private adminEventService: AdminEventService) {}

  ngOnInit(): void {
    this.getEventsInit();
  }

  getEventsInit(): void {
    this.loading = true;
    this.adminEventService
      .getUserEvents()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.events = data;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.message;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  setErrorDismissed($event: boolean): void {
    if ($event) {
      this.errorMessage = undefined;
      this.getEventsInit();
    }

    return;
  }
}
