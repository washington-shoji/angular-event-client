import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavMenu, navMenu } from './header-menu';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.scss',
})
export class PublicHeaderComponent {
  menuItems: NavMenu[] = [];
  menuOpen: boolean = false;

  constructor() {
    this.menuItems = navMenu;
  }

  toggleOpenMenu(): void {
    this.menuOpen = !this.menuOpen;
    console.warn('this.menuOpen', this.menuOpen);
  }
}
