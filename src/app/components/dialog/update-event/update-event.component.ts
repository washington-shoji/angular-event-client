import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AdminEventService } from '../../../pages/admin/services/admin-event.service';
import { ErrorAlertComponent } from '../../error-alert/error-alert.component';
import { AddressFormComponent } from '../../form/address-form/address-form.component';
import { EventAddress } from '../../../types/event-address';
import { AdminEventAddressService } from '../../../pages/admin/services/admin-event-address.service';
import { AdminEventImageService } from '../../../pages/admin/services/admin-event-image.service';
import { EventImage } from '../../../types/event-image';
import { AppEventRequest } from '../../../types/event-all-info';
import { EventFormComponent } from '../../form/event-form/event-form.component';

type RouteState = {
  eventId: string | undefined;
  event: AppEventRequest | undefined;
  navigationId: number;
};

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorAlertComponent,
    EventFormComponent,
    AddressFormComponent,
  ],
  providers: [
    AdminEventService,
    AdminEventAddressService,
    AdminEventImageService,
  ],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss',
})
export class UpdateEventComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  eventId: string | undefined;
  event: AppEventRequest | undefined;
  eventAddress: EventAddress | undefined;
  eventImage: EventImage | undefined;
  loading: boolean = false;
  submitting: boolean = false;
  errorMessage: string | undefined = undefined;
  fileObj!: File;
  selectedFile!: any;
  previewFile!: string;
  constructor(
    private router: Router,
    private location: Location,
    private adminEventService: AdminEventService,
    private adminEventAddressService: AdminEventAddressService,
    private adminEventImageService: AdminEventImageService
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.eventInit();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  eventInit(): void {
    this.loading = true;
    const state = this.location.getState() as RouteState;
    this.eventId = state.eventId;

    if (!this.eventId) {
      this.router.navigate(['admin', 'events']);
      return;
    }

    this.adminEventService
      .getUserEventAllInfoById(this.eventId)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.event = data;
          this.eventAddress = this.event.eventAddressModel;
          this.eventImage = this.event.eventImageModel;
        },
        error: (error) => {
          this.loading = false;
          console.error('Error', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  dismiss($event?: boolean): void {
    if (!$event) return;
    this.router.navigate(['admin', 'events']);
  }

  dismissError($event: boolean) {
    if ($event) {
      this.errorMessage = undefined;
    }
  }

  submit($event: FormGroup): void {
    if (!$event?.valid || !this.event?.eventModel.event_id) return;

    this.submitting = true;
    const formValue = $event?.value;
    const id = this.event?.eventModel.event_id;
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
    if ($event.valid && this.event?.eventModel.event_id) {
      this.adminEventAddressService
        .createEventAddress(this.event?.eventModel.event_id, $event.value)
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
  }

  submitPresignedImage(): void {
    this.submitting = true;
    if (this.eventImage?.presignedUrl) {
      this.adminEventImageService
        .updateImageFilePresignedUrl(this.eventImage.presignedUrl, this.fileObj)
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
  }

  onFileSelected($event: Event): void {
    const input = $event?.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return; // No file selected
    }
    this.fileObj = input.files[0];
    this.previewFile = URL.createObjectURL(this.fileObj);
  }
}
