import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AdminEventService } from '../../../pages/admin/services/admin-event.service';
import { Subscription } from 'rxjs';
import { AppEvent } from '../../../pages/public-event-page/event.type';

type RouteState = {
  event: AppEvent;
  navigationId: number;
};

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [],
  providers: [AdminEventService],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss',
})
export class UpdateEventComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  event: AppEvent | undefined;
  constructor(private router: Router, private location: Location) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.eventInit();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  eventInit(): void {
    const state = this.location.getState() as RouteState;
    this.event = state.event;
  }

  dismiss(): void {
    this.router.navigate(['admin', 'events']);
  }
}
