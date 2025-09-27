import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { API_URL_Order } from '../../constants/url';
import { OrderDTO } from '../../order-summary/model/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${API_URL_Order}/order/saveOrder`;

  constructor(private http: HttpClient) { }

  saveOrder(orderData: OrderDTO): Observable<any> {
    console.log('🔄 OrderService: Sending request to:', this.apiUrl);
    console.log('Order data', orderData);
    console.log('📦 Order data being sent:', JSON.stringify(orderData, null, 2));

    return this.http.post<any>(this.apiUrl, orderData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('✅ OrderService: Success response:', response);
      }),
      catchError(this.getErrorMessage.bind(this)),
      catchError(error => {
        console.error('❌ OrderService: Error details:', error);
        console.error('❌ Error status:', error.status);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error URL:', error.url);
        
        return throwError(() => new Error(this.getErrorMessage(error)));
      })
    );
  }

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Cannot connect to server. Please check if the backend is running.';
    } else if (error.status === 404) {
      return 'Order endpoint not found (404). Check the API URL.';
    } else if (error.status === 500) {
      return 'Server error. Please try again later.';
    } else {
      return error.message || 'An unexpected error occurred';
    }
  }
}