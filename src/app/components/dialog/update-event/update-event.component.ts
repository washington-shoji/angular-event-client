import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, formatDate, Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AdminEventService } from '../../../pages/admin/services/admin-event.service';
import { ErrorAlertComponent } from '../../error-alert/error-alert.component';
import { AddressFormComponent } from '../../form/address-form/address-form.component';
import { EventAddress } from '../../../types/event-address';
import { AdminEventAddressService } from '../../../pages/admin/services/admin-event-address.service';
import { AppEvent } from '../../../types/event';

type RouteState = {
  event: AppEvent;
  navigationId: number;
};

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorAlertComponent,
    AddressFormComponent,
  ],
  providers: [AdminEventService, AdminEventAddressService],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss',
})
export class UpdateEventComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  event: AppEvent | undefined;
  eventAddress!: EventAddress;
  eventFrm: FormGroup;
  submitting: boolean = false;
  errorMessage: string | undefined = undefined;
  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private adminEventService: AdminEventService,
    private adminEventAddressService: AdminEventAddressService
  ) {
    this._subscription = new Subscription();
    this.eventFrm = new FormGroup({});
  }

  ngOnInit(): void {
    this.eventInit();
    this.eventAddressInit();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  eventInit(): void {
    const state = this.location.getState() as RouteState;
    this.event = state.event;

    this.eventFrm = this.formBuilder.group({
      id: [this.event.event_id],
      title: [this.event.title, Validators.required],
      description: [this.event.description, Validators.required],
      registration_open: [
        this._convertDateTime(this.event.registration_open),
        Validators.required,
      ],
      registration_close: [
        this._convertDateTime(this.event.registration_close),
        Validators.required,
      ],
      event_date: [
        this._convertDateTime(this.event.event_date),
        Validators.required,
      ],
      location_type: [this.event.location_type, Validators.required],
    });
  }

  eventAddressInit(): void {
    if (this.event?.event_id) {
      this.adminEventAddressService
        .findEventAddressByEventId(this.event.event_id)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.eventAddress = response;
            //this.router.navigate(['admin', 'events']);
          },
          error: (error) => {
            this.submitting = false;
            this.errorMessage = error.errorMessage;
          },
          complete: () => {
            this.submitting = false;
          },
        });
    }
  }

  dismiss(): void {
    this.router.navigate(['admin', 'events']);
  }

  dismissError($event: boolean) {
    if ($event) {
      this.errorMessage = undefined;
    }
  }

  submit(): void {
    if (!this.eventForm.valid || !this.event?.event_id) return;

    this.submitting = true;
    const formValue = this.eventForm.value;
    const id = this.event?.event_id;
    this.adminEventService
      .updateEvent(id, formValue)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.router.navigate(['admin', 'events']);
        },
        error: (error) => {
          this.submitting = false;
          this.errorMessage = error.errorMessage;
        },
        complete: () => {
          this.submitting = false;
        },
      });
  }

  submitAddress($event: FormGroup): void {
    if ($event.valid && this.event?.event_id) {
      this.adminEventAddressService
        .createEventAddress(this.event?.event_id, $event.value)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            //this.router.navigate(['admin', 'events']);
          },
          error: (error) => {
            this.submitting = false;
            this.errorMessage = error.errorMessage;
          },
          complete: () => {
            this.submitting = false;
          },
        });
    }
  }

  get eventForm(): FormGroup {
    return this.eventFrm;
  }

  get titleControl(): FormControl {
    return this.eventForm.get('title') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.eventForm.get('description') as FormControl;
  }

  get registrationOpenControl(): FormControl {
    return this.eventForm.get('registration_open') as FormControl;
  }

  get registrationCloseControl(): FormControl {
    return this.eventForm.get('registration_close') as FormControl;
  }

  get eventDateControl(): FormControl {
    return this.eventForm.get('event_date') as FormControl;
  }

  get locationTypeControl(): FormControl {
    return this.eventForm.get('location_type') as FormControl;
  }

  private _convertDateTime(date: string): string {
    return formatDate(date, 'yyyy-MM-ddTHH:mm', 'en');
  }
}
