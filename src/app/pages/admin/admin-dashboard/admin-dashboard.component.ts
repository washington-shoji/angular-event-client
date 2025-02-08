import { Component, OnInit } from '@angular/core';
import { AdminStatsService } from '../services/admin-stats.service';
import { EventStats } from '../../../types/event-stats';
import { take } from 'rxjs';
import { DashboardStatsCardComponent } from '../../../components/stats-card/dashboard-stats-card/dashboard-stats-card.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DashboardStatsCardComponent],
  providers: [AdminStatsService],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  eventsStats: EventStats | undefined;
  loading: boolean = false;
  errorMessage: string | undefined = undefined;

  constructor(private adminStatsService: AdminStatsService) {}
  ngOnInit(): void {
    this.eventStatsInit();
  }

  eventStatsInit(): void {
    this.adminStatsService
      .getEventsStats()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.eventsStats = data;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error?.message;
          console.error('Error', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
