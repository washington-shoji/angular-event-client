import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEventService } from '../../../pages/admin/services/admin-event.service';
import { take } from 'rxjs';
import { ErrorAlertComponent } from '../../error-alert/error-alert.component';
import { LOCATION_TYPE } from '../../../types/event';
import { AppEventRequest } from '../../../types/event-all-info';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorAlertComponent],
  providers: [AdminEventService],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent implements OnInit {
  eventFrm: FormGroup;
  submitting: boolean = false;
  errorMessage: string | undefined = undefined;
  locationTypeOptions: LOCATION_TYPE[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminEventService: AdminEventService
  ) {
    this.eventFrm = new FormGroup({});
    this.locationTypeOptions = ['VENUE', 'ONLINE'];
  }

  ngOnInit(): void {
    this.eventFrm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      registration_open: ['', Validators.required],
      registration_close: ['', Validators.required],
      event_date: ['', Validators.required],
      location_type: ['VENUE', Validators.required],
      street: ['', Validators.required],
      city_suburb: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postal_code: ['', Validators.required],
    });
  }

  dismiss(): void {
    this.router.navigate(['admin', 'events']);
  }

  submit(): void {
    this.submitting = true;
    const appEventRequest = <AppEventRequest>{
      eventModel: {
        title: this.titleControl?.value,
        description: this.descriptionControl?.value,
        registration_open: this.registrationOpenControl?.value,
        registration_close: this.registrationCloseControl?.value,
        event_date: this.eventDateControl?.value,
        location_type: this.locationTypeControl?.value,
      },
      eventAddressModel: {
        street: this.streetControl?.value,
        city_suburb: this.citySuburbControl?.value,
        state: this.stateControl?.value,
        country: this.countryControl?.value,
        postal_code: this.postalCodeControl?.value,
      },
    };
    this.adminEventService
      .createEvents(appEventRequest)
      .pipe(take(1))
      .subscribe({
        next: () => {
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

  onDismiss($event: boolean) {
    if ($event) {
      this.errorMessage = undefined;
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

  get streetControl(): FormControl {
    return this.eventForm.get('street') as FormControl;
  }

  get citySuburbControl(): FormControl {
    return this.eventForm.get('city_suburb') as FormControl;
  }

  get stateControl(): FormControl {
    return this.eventForm.get('state') as FormControl;
  }

  get countryControl(): FormControl {
    return this.eventForm.get('country') as FormControl;
  }

  get postalCodeControl(): FormControl {
    return this.eventForm.get('postal_code') as FormControl;
  }
}
