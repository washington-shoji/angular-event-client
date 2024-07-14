import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ErrorAlertComponent } from '../../../../components/error-alert/error-alert.component';
import { LoadingIndicatorComponent } from '../../../../components/loading-indicator/loading-indicator.component';
import { PublicEventService } from '../../../public-event-page/public-event.service';
import { AppEvent } from '../../../public-event-page/event.type';
import { PrivateEventCardComponent } from '../../../../components/private-event-card/private-event-card.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-events',
  standalone: true,
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.scss',
  imports: [
    PrivateEventCardComponent,
    ErrorAlertComponent,
    LoadingIndicatorComponent,
  ],
  providers: [PublicEventService],
})
export class AdminAllEventsComponent {
  events: AppEvent[] = [];
  loading: boolean = false;
  errorMessage: string | undefined;
  errorDismissed: any;

  constructor(
    private publicEventService: PublicEventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getAllEventsInit();
  }

  getAllEventsInit(): void {
    this.loading = true;
    this.publicEventService
      .getAllPublicEvents()
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
      this.getAllEventsInit();
    }

    return;
  }

  navigateToRegistration($event: AppEvent): void {
    if ($event.id) {
      console.warn('$event', $event);
      this.router.navigate(['admin', 'registration'], {
        state: { event: $event },
      });
    }
  }
}
