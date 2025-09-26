import { Routes } from '@angular/router';
import { RestaurantListingComponent } from './restaurant-listing/components/restaurant-listing.component';
import { FoodCatalogueComponent } from './food-catalogue/components/food-catalogue.component';
export const routes: Routes = [
  { path: '', redirectTo: 'restaurant-listing', pathMatch: 'full' },
  { path: 'restaurant-listing', component: RestaurantListingComponent },
  { path: 'food-catalogue/:id', component: FoodCatalogueComponent }
];
