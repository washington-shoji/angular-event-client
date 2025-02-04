import { CommonModule, formatDate } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppEvent } from '../../../types/event';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent implements OnInit {
  event = input.required<AppEvent | undefined>();
  eventFrmData = output<FormGroup>();

  submitting = input.required<boolean>();
  dismissed = output<boolean>();

  eventFrm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.eventFrm = new FormGroup({});
  }
  ngOnInit(): void {
    this.eventFormInit();
  }

  eventFormInit(): void {
    this.eventFrm = this.formBuilder.group({
      id: [this.event()?.event_id],
      title: [this.event()?.title, Validators.required],
      description: [this.event()?.description, Validators.required],
      registration_open: [
        this._convertDateTime(this.event()?.registration_open as string),
        Validators.required,
      ],
      registration_close: [
        this._convertDateTime(this.event()?.registration_close as string),
        Validators.required,
      ],
      event_date: [
        this._convertDateTime(this.event()?.event_date as string),
        Validators.required,
      ],
      location_type: [this.event()?.location_type, Validators.required],
    });
  }

  dismiss(): void {
    this.dismissed.emit(true);
  }

  submit(): void {
    if (!this.eventForm.valid) return;
    this.eventFrmData.emit(this.eventForm);
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
