import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss',
})
export class UpdateEventComponent {
  constructor(private router: Router) {}

  dismiss(): void {
    this.router.navigate(['admin', 'events']);
  }
}
