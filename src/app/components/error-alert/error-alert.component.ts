import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.scss',
})
export class ErrorAlertComponent {
  errorMessage = input<string | undefined>('Oops Something Went Wrong!');
  dismissClick = output<boolean>();

  emitDismiss(): void {
    this.dismissClick.emit(true);
  }
}
