import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table/table.component';
import { AdminEventService } from '../services/admin-event.service';
import { take } from 'rxjs';
import { AppEvent } from '../../../types/event';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [TableComponent],
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
          this.errorMessage = error.errorMessage;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
