import { Component, OnInit } from '@angular/core';
import { PublicEventService } from './public-event.service';
import { take } from 'rxjs';
import { PublicEventCardComponent } from '../../components/public-event-card/public-event-card.component';
import { AppEvent } from './event.type';

@Component({
  selector: 'app-public-event-page',
  standalone: true,
  imports: [PublicEventCardComponent],
  providers: [PublicEventService],
  templateUrl: './public-event-page.component.html',
  styleUrl: './public-event-page.component.scss',
})
export class PublicEventPageComponent implements OnInit {
  events: AppEvent[] = [];
  loading: boolean = false;

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
        error: (error) => {},
        complete: () => {
          this.loading = false;
        },
      });
  }
}
