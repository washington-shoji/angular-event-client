import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-table-header',
  standalone: true,
  imports: [],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.scss',
})
export class TableHeaderComponent {
  addButtonTitle = input<string>('Add Item');
  addButtonClick = output<boolean>();

  emitAdd(): void {
    this.addButtonClick.emit(true);
  }
}
