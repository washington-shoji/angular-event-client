import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ErrorAlertComponent } from '../../../../components/error-alert/error-alert.component';
import { LoadingIndicatorComponent } from '../../../../components/loading-indicator/loading-indicator.component';
import { PublicEventService } from '../../../public-event-page/public-event.service';
import { PrivateEventCardComponent } from '../../../../components/private-event-card/private-event-card.component';
import { Router } from '@angular/router';
import { InfoAlertComponent } from '../../../../components/info-alert/info-alert.component';
import { AppEventRequest } from '../../../../types/event-all-info';

@Component({
  selector: 'app-all-events',
  standalone: true,
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.scss',
  imports: [
    PrivateEventCardComponent,
    ErrorAlertComponent,
    LoadingIndicatorComponent,
    InfoAlertComponent,
  ],
  providers: [PublicEventService],
})
export class AdminAllEventsComponent {
  events: AppEventRequest[] = [];
  loading: boolean = false;
  errorMessage: string | undefined;

  constructor(
    private publicEventService: PublicEventService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllEventsInit();
  }

  getAllEventsInit(): void {
    this.loading = true;
    this.publicEventService
      .getAllOthersEvents()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.events = data;
          console.warn('this.events', this.events);
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
      this.getAllEventsInit();
    }

    return;
  }

  navigateToRegistration($event: AppEventRequest): void {
    if ($event.eventModel.event_id) {
      this.router.navigate(['admin', 'registration'], {
        state: { event: $event },
      });
    }
  }
}
