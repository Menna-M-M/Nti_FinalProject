// services/order.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'http://localhost:4000/api/orders';

  constructor(private http: HttpClient) {}


  getOrders(userId: string) {
    
    return this.http.get(`${this.baseUrl}/${userId}`);

  }

  deleteOrder(orderId: string) {
    return this.http.delete(`${this.baseUrl}/${orderId}`);
  }
}
