import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';

@Component({
  selector: 'app-admin-layout-screen',
  standalone: true,
  imports: [RouterModule, AdminNavbarComponent, AdminSidebarComponent],
  providers: [SessionStorageService],
  templateUrl: './admin-layout-screen.component.html',
  styleUrl: './admin-layout-screen.component.scss',
})
export class AdminLayoutScreenComponent {
  openSidebar: boolean = false;

  toggleOpenSidebar($event: boolean): void {
    this.openSidebar = !this.openSidebar;
  }
}
