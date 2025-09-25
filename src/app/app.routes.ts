import { Routes } from '@angular/router';
import { RestaurantListingComponent } from './restaurant-listing/components/restaurant-listing.component';

export const routes: Routes = [
  { path: '', redirectTo: 'restaurant-listing', pathMatch: 'full' },
  { path: 'restaurant-listing', component: RestaurantListingComponent }
];
