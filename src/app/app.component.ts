import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/components/header.component';


@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterModule,
        RouterOutlet,
        HeaderComponent,
    ],
    template: `
    <div class="app-container">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
    styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'food-delivery-app';
}