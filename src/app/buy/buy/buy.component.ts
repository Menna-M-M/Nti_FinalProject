import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';
import { OrderService } from '../../services/order-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule], 
})
export class BuyComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;
  shippingInfo = {
    address: '',
    phone: '',
    notes: ''
  };

  private subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartServiceService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cartSub = this.cartService.cart.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotal();
    });

    this.subscriptions.push(cartSub);
  }

  placeOrder() {
    const order = {
      items: this.cartItems,
      total: this.totalPrice,
      shipping: this.shippingInfo,
      date: new Date(),
      status: 'Pending'
    };

    this.orderService.addOrder(order);
    alert('Order placed successfully!');
    this.router.navigate(['/orders']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
