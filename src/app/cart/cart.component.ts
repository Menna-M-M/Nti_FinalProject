import { Component } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
   cartItems: any[] = [];

  constructor(private cartService: CartServiceService, private router: Router) {}

  ngOnInit() {
  this.cartService.loadCartFromServer();
  this.cartService.getCartItems().subscribe(items => this.cartItems = items);
}


  increase(item: any) {
    console.log (item.product._id)
    this.cartService.changeQuantity(item.product._id,  item.quantity + 1);
    this.router.navigate(['/cart']);
  }

decrease(item: any) {
  const newQuantity = item.quantity - 1;

  if (newQuantity <= 0) {
    this.cartService.removeFromCart(item.product);
  } else {
    this.cartService.changeQuantity(item.product._id, newQuantity);
  }
}


  remove(item: any) {
    this.cartService.removeFromCart(item.product);
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
