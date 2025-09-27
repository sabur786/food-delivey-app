import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/components/header.component';
import { FoodCatalogueModule } from './food-catalogue/food-catalogue.module';
import { OrderSummaryModule } from './order-summary/order-summary.module';


@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterModule,
        RouterOutlet,
        HeaderComponent,
        FoodCatalogueModule, 
        OrderSummaryModule
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