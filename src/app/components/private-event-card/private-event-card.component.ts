import { Component, input, output } from '@angular/core';
import { AppEvent } from '../../pages/public-event-page/event.type';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-private-event-card',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './private-event-card.component.html',
  styleUrl: './private-event-card.component.scss',
})
export class PrivateEventCardComponent {
  event = input.required<AppEvent>();
  navigated = output<AppEvent>();

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

  navigate($event: AppEvent): void {
    if ($event.id) {
      this.navigated.emit($event);
    }
  }
}
