import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL_FC } from '../../constants/url';
import { HttpClient } from '@angular/common/http';
import { FoodCataloguePage } from '../../Shared/models/FoodCataloguePage';
import { HttpErrorResponse } from '@angular/common/http'; 
import { FoodItem } from '../../Shared/models/FoodItem';

@Injectable({
  providedIn: 'root'
})
export class FooditemService {

   private apiUrl = API_URL_FC+'/foodCatalogue';

  constructor(private http: HttpClient) { }

  getFoodItemsByRestaurant(restaurantId: number): Observable<FoodCataloguePage> {
        return this.http.get<FoodCataloguePage>(`${this.apiUrl}/fetchRestaurantAndFoodItemsById/${restaurantId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.status === 0) {
      // Client-side or network error
      errorMessage = 'Network error: Please check your connection and ensure the backend is running';
    } else if (error.status === 404) {
      errorMessage = `Restaurant not found (404): ${error.url}`;
    } else {
      // Server-side error
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}