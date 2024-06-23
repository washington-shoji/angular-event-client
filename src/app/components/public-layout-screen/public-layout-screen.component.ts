import { Component } from '@angular/core';
import { PublicHeaderComponent } from '../public-header/public-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout-screen',
  standalone: true,
  imports: [RouterOutlet, PublicHeaderComponent],
  templateUrl: './public-layout-screen.component.html',
  styleUrl: './public-layout-screen.component.scss',
})
export class PublicLayoutScreenComponent {}
