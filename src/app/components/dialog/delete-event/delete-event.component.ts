import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-event',
  standalone: true,
  imports: [],
  templateUrl: './delete-event.component.html',
  styleUrl: './delete-event.component.scss',
})
export class DeleteEventComponent {
  constructor(private router: Router) {}

  dismiss(): void {
    this.router.navigate(['admin', 'events']);
  }
}
