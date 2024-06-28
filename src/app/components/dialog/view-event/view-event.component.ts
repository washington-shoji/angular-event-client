import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppEvent } from '../../../pages/public-event-page/event.type';

type RouteState = {
  event: AppEvent;
  navigationId: number;
};

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.scss',
})
export class ViewEventComponent implements OnInit {
  event: AppEvent | undefined;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.eventInit();
  }

  eventInit(): void {
    const state = this.location.getState() as RouteState;
    this.event = state.event;

    if (!state.event) {
      this.router.navigate(['admin', 'events']);
    }
  }

  navigateEdit(): void {
    this.router.navigate(['admin', 'update'], { state: { event: this.event } });
  }

  delete(): void {
    this.router.navigate(['admin', 'delete'], { state: { event: this.event } });
  }

  dismiss(): void {
    this.router.navigate(['admin', 'events']);
  }
}
