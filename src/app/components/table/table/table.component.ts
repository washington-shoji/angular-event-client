import { Component, input } from '@angular/core';
import { TableFooterComponent } from '../table-footer/table-footer.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { TableBodyComponent } from '../table-body/table-body.component';
import { Router, RouterOutlet } from '@angular/router';
import { AppEvent } from '../../../types/event';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    RouterOutlet,
    TableHeaderComponent,
    TableBodyComponent,
    TableFooterComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  events = input.required<AppEvent[]>();
  eventAction: boolean = false;

  constructor(private router: Router) {}

  onAddEvent($event: boolean): void {
    this.eventAction = $event;
    this.router.navigate(['admin', 'create']);
  }
}
