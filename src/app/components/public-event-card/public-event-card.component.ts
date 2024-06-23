import { Component, input } from '@angular/core';
import { AppEvent } from '../../pages/public-event-page/event.type';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-public-event-card',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './public-event-card.component.html',
  styleUrl: './public-event-card.component.scss',
})
export class PublicEventCardComponent {
  event = input.required<AppEvent>();

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
}
