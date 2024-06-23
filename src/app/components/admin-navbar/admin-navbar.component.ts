import { Component, output } from '@angular/core';
import { NotificationDropdownComponent } from '../notification-dropdown/notification-dropdown.component';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';

export type MenuDropdown = 'NOTIFICATION' | 'APPS' | 'PROFILE' | undefined;
export type DropdownToggle = {
  menu: MenuDropdown;
  open: boolean;
};

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [NotificationDropdownComponent, ProfileDropdownComponent],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss',
})
export class AdminNavbarComponent {
  emitOpenSidebar = output<boolean>();
  isDropdownOpen: DropdownToggle = {
    menu: undefined,
    open: false,
  };

  openSidebar(): void {
    this.emitOpenSidebar.emit(true);
  }

  toggleMenuDropdown(isOpen: boolean, menuType: MenuDropdown): void {
    switch (menuType) {
      case 'NOTIFICATION':
        this.isDropdownOpen = {
          menu: 'NOTIFICATION',
          open: !isOpen,
        };
        break;

      case 'APPS':
        this.isDropdownOpen = {
          menu: 'APPS',
          open: !isOpen,
        };
        break;

      case 'PROFILE':
        this.isDropdownOpen = {
          menu: 'PROFILE',
          open: !isOpen,
        };
        break;

      default:
        this.isDropdownOpen = {
          menu: undefined,
          open: false,
        };
        break;
    }
  }
}
