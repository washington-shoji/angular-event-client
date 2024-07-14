import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate, Location } from '@angular/common';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
import { AppEvent } from '../../pages/public-event-page/event.type';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { AdminAttendeeEventService } from '../../pages/admin/services/admin-attendee-event.service';

type RouteState = {
  event: AppEvent;
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

  event: AppEvent | undefined;
  submitting: boolean = false;
  errorMessage: string | undefined = undefined;

  constructor(
    private router: Router,
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

    this.eventAttendeeFrm = this.formBuilder.group({
      attendeeName: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  dismiss(): void {
    this.router.navigate(['admin', 'all-events']);
  }

  dismissError($event: boolean) {
    if ($event) {
      this.errorMessage = undefined;
    }
  }

  submit(): void {
    if (this.eventAttendeeForm.valid && this.event?.id) {
      this.submitting = true;
      const formValue = this.eventAttendeeForm.value;

      this.adminAttendeeEventService
        .createEventAttendee(this.event.id, formValue)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.router.navigate(['admin', 'all-events']);
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

  get eventAttendeeForm(): FormGroup {
    return this.eventAttendeeFrm;
  }

  get attendeeNameControl(): FormControl {
    return this.eventAttendeeForm.get('attendeeName') as FormControl;
  }

  get statusControl(): FormControl {
    return this.eventAttendeeForm.get('status') as FormControl;
  }
}
