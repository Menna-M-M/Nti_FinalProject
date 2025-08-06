import { Component } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
   cartItems: any[] = [];

  constructor(private cartService: CartServiceService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);
  }

  increase(item: any) {
    this.cartService.changeQuantity(item.product.id, 1);
  }

  decrease(item: any) {
    this.cartService.changeQuantity(item.product.id, -1);
  }

  remove(item: any) {
    this.cartService.removeFromCart(item.product.id);
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
