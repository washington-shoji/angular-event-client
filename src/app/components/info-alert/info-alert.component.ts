import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-info-alert',
  standalone: true,
  imports: [],
  templateUrl: './info-alert.component.html',
  styleUrl: './info-alert.component.scss',
})
export class InfoAlertComponent {
  infoTitle = input<string | undefined>('Info title!');
  infoMessage = input<string | undefined>('Info message!');
  dismissible = input<boolean>(false);
  dismissClick = output<boolean>();

  emitDismiss(): void {
    this.dismissClick.emit(true);
  }
}
