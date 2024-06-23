import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-layout-screen',
  standalone: true,
  imports: [AdminNavbarComponent, AdminSidebarComponent],
  templateUrl: './admin-layout-screen.component.html',
  styleUrl: './admin-layout-screen.component.scss',
})
export class AdminLayoutScreenComponent {
  openSidebar: boolean = false;

  toggleOpenSidebar($event: boolean): void {
    this.openSidebar = !this.openSidebar;
  }
}
