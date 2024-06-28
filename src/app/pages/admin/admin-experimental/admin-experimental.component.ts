import { Component } from '@angular/core';
import { CreateEventComponent } from '../../../components/dialog/create-event/create-event.component';

@Component({
  selector: 'app-admin-experimental',
  standalone: true,
  imports: [CreateEventComponent],
  templateUrl: './admin-experimental.component.html',
  styleUrl: './admin-experimental.component.scss',
})
export class AdminExperimentalComponent {}
