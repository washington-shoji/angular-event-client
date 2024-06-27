import { Component, input } from '@angular/core';
import { AppEvent } from '../../../pages/public-event-page/event.type';
import { Router } from '@angular/router';
import { AdminEventService } from '../../../pages/admin/services/admin-event.service';

type Action = 'DELETE' | 'UPDATE' | 'VIEW';

@Component({
  selector: 'app-table-body',
  standalone: true,
  imports: [],
  providers: [AdminEventService],
  templateUrl: './table-body.component.html',
  styleUrl: './table-body.component.scss',
})
export class TableBodyComponent {
  events = input.required<AppEvent[]>();

  openAction: boolean[] = [];
  rowIndex: number = 0;

  constructor(private router: Router) {}

  toggleActionMenu(index: number): void {
    this.rowIndex = index;
    this.openAction[index] = !this.openAction[index];
  }

  navigate(index: number, event: AppEvent, action: Action) {
    console.warn('event', event);
    if (action === 'UPDATE') {
      this.router.navigate(['admin', 'update'], { state: { event: event } });
    }

    if (action === 'VIEW') {
      this.router.navigate(['admin', 'view'], { state: { event: event } });
    }

    if (action === 'DELETE') {
      this.router.navigate(['admin', 'delete'], { state: { event: event } });
    }

    this.toggleActionMenu(index);
  }
}
