import { Component, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppEventRequest } from '../../types/event-all-info';

@Component({
  selector: 'app-private-event-card',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './private-event-card.component.html',
  styleUrl: './private-event-card.component.scss',
})
export class PrivateEventCardComponent {
  event = input.required<AppEventRequest>();
  navigated = output<AppEventRequest>();

  constructor(private datePipe: DatePipe) {}

  isEventClosed(date: string): boolean {
    const currentDate = Date.now();
    const eventClosedDate = Date.parse(date);

    if (eventClosedDate < currentDate) {
      return true;
    }

    return false;
  }

  isEventOpened(date: string): boolean {
    const currentDate = Date.now();
    const eventOpenDate = Date.parse(date);

    if (eventOpenDate < currentDate) {
      return true;
    }

    return false;
  }

  toDate(date: string) {
    return this.datePipe.transform(date);
  }

  navigate($event: AppEventRequest): void {
    if ($event.eventModel.event_id) {
      this.navigated.emit($event);
    }
  }
}
