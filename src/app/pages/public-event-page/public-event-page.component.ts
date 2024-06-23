import { Component, OnInit } from '@angular/core';
import { PublicEventService } from './public-event.service';
import { take } from 'rxjs';
import { PublicEventCardComponent } from '../../components/public-event-card/public-event-card.component';
import { AppEvent } from './event.type';
import { LoadingIndicatorComponent } from '../../components/loading-indicator/loading-indicator.component';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';

@Component({
  selector: 'app-public-event-page',
  standalone: true,
  imports: [
    PublicEventCardComponent,
    LoadingIndicatorComponent,
    ErrorAlertComponent,
  ],
  providers: [PublicEventService],
  templateUrl: './public-event-page.component.html',
  styleUrl: './public-event-page.component.scss',
})
export class PublicEventPageComponent implements OnInit {
  events: AppEvent[] = [];
  loading: boolean = false;
  errorMessage: string | undefined;
  errorDismissed: any;

  constructor(private publicEventService: PublicEventService) {}
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
}
