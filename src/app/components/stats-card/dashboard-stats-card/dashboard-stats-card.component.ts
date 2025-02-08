import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-stats-card.component.html',
  styleUrl: './dashboard-stats-card.component.scss',
})
export class DashboardStatsCardComponent {
  title = input<string | undefined>('Card Title');
  stats = input<string | undefined>('Card Stats');
  textColour = input<string>('text-blue-600');
  bgColour = input<string>('bg-blue-100');
}
