import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FooditemService } from '../service/fooditem.service';
import { FoodItem } from '../../Shared/models/FoodItem';
import { FoodCataloguePage } from '../../Shared/models/FoodCataloguePage';
import { Restaurant } from '../../Shared/models/Restaurant';

@Component({
  selector: 'app-food-catalogue',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css'
})
export class FoodCatalogueComponent implements OnInit {

  restaurantId!: number;
  foodItemResponse!: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];

  constructor(
    private route: ActivatedRoute, 
    private foodItemService: FooditemService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = Number(params.get('id'));
      console.log('Restaurant ID from route:', this.restaurantId);
      
      // Call the service INSIDE the subscription
      this.getFoodItemsByRestaurant(this.restaurantId);
    });
  }

  getFoodItemsByRestaurant(restaurantId: number): void {
    this.foodItemService.getFoodItemsByRestaurant(restaurantId).subscribe({
      next: (data) => {
        this.foodItemResponse = data;
        console.log('Food items loaded:', this.foodItemResponse);
      },
      error: (err) => {
        console.error('Error fetching food items:', err);
      }
    });
  }

  increment(food: FoodItem): void {
    food.quantity = (food.quantity || 0) + 1;
    this.updateFoodItemCart(food);
  }

  decrement(food: FoodItem): void {
    if (food.quantity && food.quantity > 0) {
      food.quantity--;
      this.updateFoodItemCart(food);
    }
  }

  private updateFoodItemCart(food: FoodItem): void {
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    
    if (food.quantity === 0) {
      if (index !== -1) {
        this.foodItemCart.splice(index, 1);
      }
    } else {
      if (index === -1) {
        this.foodItemCart.push({...food});
      } else {
        this.foodItemCart[index] = {...food};
      }
    }
    
    console.log('Cart updated:', this.foodItemCart);
  }

  onCheckOut(): void {
    console.log('Checkout clicked. Cart items:', this.foodItemCart);
    
    // Filter items with quantity > 0
    const itemsToCheckout = this.foodItemCart.filter(item => item.quantity > 0);
    
    if (itemsToCheckout.length === 0) {
      alert('Please add items to cart before checkout');
      return;
    }

    if (!this.foodItemResponse?.restaurant) {
      alert('Restaurant information is missing');
      return;
    }

    const orderSummary: FoodCataloguePage = {
      foodItemsList: itemsToCheckout,
      restaurant: this.foodItemResponse.restaurant
    };

    console.log('Navigating to order summary with data:', orderSummary);
    
    // FIX: Use the correct route path - match your routes exactly
    this.router.navigate(['/order-summary'], { 
      queryParams: { data: JSON.stringify(orderSummary) } 
    });
  }
}