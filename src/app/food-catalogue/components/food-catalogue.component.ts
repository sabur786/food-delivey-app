import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FooditemService } from '../service/fooditem.service';
import { FoodItem } from '../../Shared/models/FoodItem';
import { FoodCataloguePage } from '../../Shared/models/FoodCataloguePage';
import { Restaurant } from '../../Shared/models/Restaurant';

@Component({
  selector: 'app-food-catalogue',
  standalone: true,
  imports: [],
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css'
})
export class FoodCatalogueComponent {

  restaurantId: number;
  foodItemResponse: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage;

  constructor(private route: ActivatedRoute, private foodItemService: FooditemService, private router: Router) {}

  foodItemsList: FoodItem[] = [];
  restaurant: Restaurant | undefined;


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.restaurantId = + Number(params.get('id'));
    });

    this.getFoodItemsByRestaurant(this.restaurantId);
    
  }

  
  getFoodItemsByRestaurant(restaurant: number) {
    this.foodItemService.getFoodItemsByRestaurant(restaurant).subscribe(
      data => {
        this.foodItemResponse = data;
      }
    )
  }

  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

    }
  }

  onCheckOut() {
    this.foodItemCart;
    this.orderSummary = {
      foodItemsList: [],
      restaurant: null as any
    }
    this.orderSummary.foodItemsList = this.foodItemCart;
    this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }




}