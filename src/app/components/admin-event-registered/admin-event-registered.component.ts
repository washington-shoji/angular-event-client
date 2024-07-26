import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RegisteredEvent } from '../../types/event-registered';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-event-registered',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-event-registered.component.html',
  styleUrl: './admin-event-registered.component.scss',
})
export class AdminEventRegisteredComponent {
  registeredEvent = input.required<RegisteredEvent>();

  constructor(private router: Router) {}

  navigateToView(): void {
    this.router.navigate(['admin', 'registered-event-view'], {
      state: { registeredEvent: this.registeredEvent() },
    });
  }

  navigateToEdit(): void {
    if (!this.registeredEvent()) return;

    this.router.navigate(['admin', 'registration'], {
      state: {
        event: this.registeredEvent().event,
        attendee: this.registeredEvent().attendee,
      },
    });
  }
}
