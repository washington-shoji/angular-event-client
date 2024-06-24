import { Component } from '@angular/core';
import { TableFooterComponent } from '../table-footer/table-footer.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { TableBodyComponent } from '../table-body/table-body.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableHeaderComponent, TableBodyComponent, TableFooterComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  addEvent: boolean = false;

  onAddEvent($event: boolean): void {
    this.addEvent = $event;
  }
}
