import { Routes } from '@angular/router';
import { RestaurantListingComponent } from './restaurant-listing/components/restaurant-listing.component';
import { FoodCatalogueComponent } from './food-catalogue/components/food-catalogue.component';



import { OrderSummaryComponent } from './order-summary/components/order-summary.component';


export const routes: Routes = [
  { path: '', redirectTo: 'restaurant-listing', pathMatch: 'full' },
  { path: 'restaurant-listing', component: RestaurantListingComponent },
  { path: 'food-catalogue/:id', component: FoodCatalogueComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
   { path: '**', redirectTo: 'restaurant-listing' } 
 
];