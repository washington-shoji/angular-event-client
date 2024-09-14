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
    });
  }

  dismiss(): void {
    this.router.navigate(['admin', 'events']);
  }

  submit(): void {
    this.submitting = true;
    const formValue = this.eventForm.value;
    this.adminEventService
      .createEvents(formValue)
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
}
