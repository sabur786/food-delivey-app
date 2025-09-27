import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../service/order.service';
import { OrderDTO } from '../../order-summary/model/OrderDTO'; 
import { FoodItem } from '../../Shared/models/FoodItem';


@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})

export class OrderSummaryComponent implements OnInit {

  orderSummary?: OrderDTO;
  total: number = 0;
  showDialog: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private orderService: OrderService, 
    private router: Router
  ) { }
  
ngOnInit(): void {
  console.log('OrderSummaryComponent initialized');
  
  const data = this.route.snapshot.queryParams['data'];
  console.log('Query params data:', data);
  
  if (data) {
    try {
      this.orderSummary = JSON.parse(data);
      this.orderSummary!.userId = 1;
      this.calculateTotal();
      console.log('Order summary parsed successfully:', this.orderSummary);
    } catch (error) {
      console.error('Error parsing order data:', error);
      this.navigateToHome();
    }
  } else {
    console.error('No order data found in query parameters');
    this.navigateToHome();
  }
}

  private calculateTotal(): void {
    if (!this.orderSummary?.foodItemsList) {
      console.warn('No food items found in order summary');
      this.total = 0;
      return;
    }

    this.total = this.orderSummary.foodItemsList.reduce((accumulator: number, currentValue: FoodItem) => {
      // Add proper null checks and default values
      const quantity = currentValue.quantity || 0;
      const price = currentValue.price || 0;
      return accumulator + (quantity * price);
    }, 0);
  }

  navigateToHome(): void {
    this.router.navigate(['/restaurant-listing']);
  }

  saveOrder(): void {
    if (!this.orderSummary) {
      console.error('No order data to save');
      return;
    }

    this.orderService.saveOrder(this.orderSummary)
      .subscribe({
        next: (response) => {
          this.showDialog = true;
        },
        error: (error) => {
          console.error('Failed to save data:', error);
        }
      });
  }

  closeDialog(): void {
    this.showDialog = false;
    this.navigateToHome();
  }

    trackByFoodId(index: number, item: FoodItem): number | undefined {
    return item.id;
  }

}