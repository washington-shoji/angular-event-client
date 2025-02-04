import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminEventService } from '../../../pages/admin/services/admin-event.service';
import { CommonModule, DatePipe } from '@angular/common';
import { AppEvent } from '../../../types/event';
import { OutsideClickDirective } from '../../../directives/outside-click.directive';

type Action = 'DELETE' | 'UPDATE' | 'VIEW';

@Component({
  selector: 'app-table-body',
  standalone: true,
  imports: [CommonModule, DatePipe, OutsideClickDirective],
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

  onClickOutside(index: number): void {
    this.openAction[index] = false;
  }

  navigate(index: number, event: AppEvent, action: Action) {
    if (action === 'UPDATE') {
      this.router.navigate(['admin', 'update'], {
        state: { eventId: event.event_id },
      });
    }

    if (action === 'VIEW') {
      this.router.navigate(['admin', 'view'], {
        state: { event: event },
      });
    }

    if (action === 'DELETE') {
      this.router.navigate(['admin', 'delete'], {
        state: { event: event },
      });
    }

    this.toggleActionMenu(index);
  }
}
