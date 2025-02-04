import { Component, OnInit } from '@angular/core';
import { PublicEventService } from './public-event.service';
import { take } from 'rxjs';
import { PublicEventCardComponent } from '../../components/public-event-card/public-event-card.component';
import { LoadingIndicatorComponent } from '../../components/loading-indicator/loading-indicator.component';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { InfoAlertComponent } from '../../components/info-alert/info-alert.component';
import { AppEventRequest } from '../../types/event-all-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-event-page',
  standalone: true,
  imports: [
    PublicEventCardComponent,
    LoadingIndicatorComponent,
    InfoAlertComponent,
    ErrorAlertComponent,
  ],
  providers: [PublicEventService],
  templateUrl: './public-event-page.component.html',
  styleUrl: './public-event-page.component.scss',
})
export class PublicEventPageComponent implements OnInit {
  events: AppEventRequest[] = [];
  loading: boolean = false;
  errorMessage: string | undefined;
  errorDismissed: any;

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

  navigate(): void {
    this.router.navigate(['login']);
  }
}
