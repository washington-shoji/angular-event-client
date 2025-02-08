import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RegisteredEvent } from '../../../types/event-registered';
import { Router } from '@angular/router';

type RouteState = {
  registeredEvent: RegisteredEvent;
  navigationId: number;
};

@Component({
  selector: 'app-event-registered-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-registered-view.component.html',
  styleUrl: './event-registered-view.component.scss',
})
export class EventRegisteredViewComponent implements OnInit {
  registeredEvent: RegisteredEvent | undefined;
  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.registeredEventInit();
  }

  registeredEventInit(): void {
    const state = this.location.getState() as RouteState;
    console.warn('state', state);
    this.registeredEvent = state.registeredEvent;

    if (!state.registeredEvent) {
      this.router.navigate(['admin', 'registered-events']);
    }
  }

  navigateToEdit(): void {
    if (!this.registeredEvent) return;

    this.router.navigate(['admin', 'registration'], {
      state: {
        event: this.registeredEvent.event,
        attendee: this.registeredEvent.attendee,
      },
    });
  }

  navigateBack(): void {
    this.location.back();
  }
}
