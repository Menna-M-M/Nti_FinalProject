import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  userId = '68848372689dbd516fd01b71'; // replace with actual user ID logic (e.g., from AuthService)

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getOrders(this.userId).subscribe({
      next: data => this.orders = data as any[],
      
      error: err => console.error(err)
      
    });
    

  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).subscribe({
      next: () => this.fetchOrders(),
      error: err => console.error(err)
    });
  }
}
