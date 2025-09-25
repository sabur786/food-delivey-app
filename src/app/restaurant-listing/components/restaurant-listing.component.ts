import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Restaurant } from '../../Shared/models/Restaurant';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-listing', 
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-listing.component.html',
  styleUrl: './restaurant-listing.component.css'
})

export class RestaurantListingComponent implements OnInit {

  public restaurantList: Restaurant[] = [];
  private imageCount = 8;
   
  ngOnInit(): void {
    this.getAllRestaurants();
  }

   constructor(private router: Router, private restaurantService: RestaurantService){}

 private getAllRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data: Restaurant[]) => { 
        // Assign images to each restaurant during initialization
        this.restaurantList = data.map(restaurant => ({
          ...restaurant,
          image: this.getDeterministicImage(restaurant.id) // Use deterministic approach
        }));
        console.log('Restaurants loaded:', this.restaurantList);
      },
      error: (err: any) => { 
        console.error('Error fetching restaurants:', err);
        this.restaurantList = this.getFallbackRestaurants().map(restaurant => ({
          ...restaurant,
          image: this.getDeterministicImage(restaurant.id)
        }));
      }
    });
  }

 private getFallbackRestaurants(): Restaurant[] {
    return [
      { id: 1, name: 'Italian Bistro' },
      { id: 2, name: 'Burger Palace' },
      { id: 3, name: 'Sushi Haven' },
      { id: 4, name: 'Mexican Fiesta' },
      { id: 5, name: 'Pizza Corner' },
      { id: 6, name: 'Thai Orchid' },
      { id: 7, name: 'Curry House' },
      { id: 8, name: 'Pakistani Delight' }
    ];
  }

  // Use deterministic approach based on restaurant ID (always returns same image for same ID)
  private getDeterministicImage(restaurantId: number): string {
    const imageIndex = (restaurantId % this.imageCount) + 1; // Returns 1-8 based on ID
    return `${imageIndex}.jpg`;
  }


  trackByRestaurantId(index: number, restaurant: Restaurant): number {
    return restaurant.id;
  }

  onButtonClick(id: number) {
    this.router.navigate(['/food-catalogue', id]);
  }

}