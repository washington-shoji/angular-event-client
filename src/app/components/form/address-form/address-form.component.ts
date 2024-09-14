import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventAddress } from '../../../types/event-address';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent implements OnInit {
  eventAddress = input.required<EventAddress>();
  submitting = input.required<boolean>();
  addressFrmData = output<FormGroup>();
  dismissed = output<boolean>();

  addressFrm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.addressFrm = new FormGroup({});
  }
  ngOnInit(): void {
    this.addressFormInit();
  }

  addressFormInit(): void {
    this.addressFrm = this.formBuilder.group({
      street: [this.eventAddress()?.street ?? null, Validators.required],
      city_suburb: [
        this.eventAddress()?.city_suburb ?? null,
        Validators.required,
      ],
      state: [this.eventAddress()?.state ?? null, Validators.required],
      country: [this.eventAddress()?.country ?? null, Validators.required],
      postal_code: [
        this.eventAddress()?.postal_code ?? null,
        Validators.required,
      ],
    });
  }

  dismiss(): void {
    this.dismissed.emit(true);
  }

  submit(): void {
    if (!this.addressForm.valid) return;
    this.addressFrmData.emit(this.addressForm);
  }

  get addressForm(): FormGroup {
    return this.addressFrm;
  }

  get streetControl(): FormControl {
    return this.addressForm.get('street') as FormControl;
  }

  get citySuburbControl(): FormControl {
    return this.addressForm.get('city_suburb') as FormControl;
  }

  get stateControl(): FormControl {
    return this.addressForm.get('state') as FormControl;
  }

  get countryControl(): FormControl {
    return this.addressForm.get('country') as FormControl;
  }

  get postalCodeControl(): FormControl {
    return this.addressForm.get('postal_code') as FormControl;
  }
}
