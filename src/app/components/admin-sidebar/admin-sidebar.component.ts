import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  sidebarMenuOpen = input.required<boolean>();

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
