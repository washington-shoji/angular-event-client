import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { take } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { AdminAttendeeEventService } from '../../pages/admin/services/admin-attendee-event.service';
import { EventAttendee } from '../../types/event-attendee';
import { AppEventRequest } from '../../types/event-all-info';

type RouteState = {
  event: AppEventRequest;
  attendee: EventAttendee;
  navigationId: number;
};

@Component({
  selector: 'app-event-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorAlertComponent],
  providers: [AdminAttendeeEventService],
  templateUrl: './event-registration.component.html',
  styleUrl: './event-registration.component.scss',
})
export class EventRegistrationComponent implements OnInit {
  eventAttendeeFrm: FormGroup;
  event: AppEventRequest | undefined;
  attendee: EventAttendee | undefined;
  submitting: boolean = false;
  errorMessage: string | undefined = undefined;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private adminAttendeeEventService: AdminAttendeeEventService
  ) {
    this.eventAttendeeFrm = new FormGroup({});
  }

  ngOnInit(): void {
    this.eventAttendeeInit();
  }

  eventAttendeeInit(): void {
    const state = this.location.getState() as RouteState;
    this.event = state.event;
    if (state?.attendee) {
      this.attendee = state?.attendee;
    }

    this.eventAttendeeFrm = this.formBuilder.group({
      registration_name: [
        this.attendee?.registration_name ?? null,
        Validators.required,
      ],
      attendee_status: [
        this.attendee?.attendee_status ?? null,
        Validators.required,
      ],
    });
  }

  dismiss(): void {
    this.location.back();
  }

  dismissError($event: boolean) {
    if ($event) {
      this.errorMessage = undefined;
    }
  }

  submit(): void {
    if (this.eventAttendeeForm.valid && this.event?.eventModel?.event_id) {
      this.submitting = true;
      const formValue = this.eventAttendeeForm.value;

      if (!this.attendee) {
        this.adminAttendeeEventService
          .createEventAttendee(this.event?.eventModel?.event_id, formValue)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.dismiss();
            },
            error: (error) => {
              this.submitting = false;
              this.errorMessage = error.errorMessage;
            },
            complete: () => {
              this.submitting = false;
            },
          });
      } else {
        this.adminAttendeeEventService
          .updateEventAttendee(
            this.event?.eventModel?.event_id as string,
            formValue
          )
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.dismiss();
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
  }

  get eventAttendeeForm(): FormGroup {
    return this.eventAttendeeFrm;
  }

  get attendeeRegistrationNameControl(): FormControl {
    return this.eventAttendeeForm.get('registration_name') as FormControl;
  }

  get attendeeStatusControl(): FormControl {
    return this.eventAttendeeForm.get('attendee_status') as FormControl;
  }
}
