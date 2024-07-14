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
import { AppEvent } from '../../../pages/public-event-page/event.type';
import { ErrorAlertComponent } from '../../error-alert/error-alert.component';
import { AddressFormComponent } from '../../form/address-form/address-form.component';
import { EventAddress } from '../../../types/event-address';
import { AdminEventAddressService } from '../../../pages/admin/services/admin-event-address.service';

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
      id: [this.event.id],
      title: [this.event.title, Validators.required],
      description: [this.event.description, Validators.required],
      start_time: [
        this._convertDateTime(this.event.start_time),
        Validators.required,
      ],
      end_time: [
        this._convertDateTime(this.event.end_time),
        Validators.required,
      ],
      location: [this.event.location, Validators.required],
    });
  }

  eventAddressInit(): void {
    if (this.event?.id) {
      this.adminEventAddressService
        .findEventAddressByEventId(this.event.id)
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
    if (!this.eventForm.valid || !this.event?.id) return;

    this.submitting = true;
    const formValue = this.eventForm.value;
    const id = this.event?.id;
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
    if ($event.valid && this.event?.id) {
      this.adminEventAddressService
        .createEventAddress(this.event?.id, $event.value)
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

  get registrationControl(): FormControl {
    return this.eventForm.get('start_time') as FormControl;
  }

  get closeControl(): FormControl {
    return this.eventForm.get('end_time') as FormControl;
  }

  get locationControl(): FormControl {
    return this.eventForm.get('location') as FormControl;
  }

  private _convertDateTime(date: string): string {
    return formatDate(date, 'yyyy-MM-ddTHH:mm', 'en');
  }
}
