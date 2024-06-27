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

interface EventForm {
  title: FormControl<string>;
  description: FormControl<string>;
  registration: FormControl<string>;
  close: FormControl<string>;
  location: FormControl<string>;
}

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
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminEventService: AdminEventService
  ) {
    this.eventFrm = new FormGroup({});
  }

  ngOnInit(): void {
    this.eventFrm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      location: ['', Validators.required],
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

  get registrationControl(): FormControl {
    return this.eventForm.get('start_time') as FormControl;
  }

  get closeControl(): FormControl {
    return this.eventForm.get('end_time') as FormControl;
  }

  get locationControl(): FormControl {
    return this.eventForm.get('location') as FormControl;
  }
}
