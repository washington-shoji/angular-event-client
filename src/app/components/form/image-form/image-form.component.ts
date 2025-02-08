import { Component, input, output } from '@angular/core';
import { EventImageModel } from '../../../types/event-image';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.scss',
})
export class ImageFormComponent {
  eventImage = input.required<EventImageModel | undefined>();
  submitting = input.required<boolean>();
  submitted = output<File>();
  dismissed = output<boolean>();
  fileObj!: File;
  previewFile!: string;

  constructor() {}

  onFileSelected($event: Event): void {
    const input = $event?.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return; // No file selected
    }
    this.fileObj = input.files[0];
    this.previewFile = URL.createObjectURL(this.fileObj);
  }

  submit(): void {
    this.submitted.emit(this.fileObj);
  }

  dismiss(): void {
    this.dismissed.emit(true);
  }
}
