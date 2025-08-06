import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})


export class CartServiceService {
  private cart_items = new BehaviorSubject<CartItem[]>([]);
  private cart_counter = new BehaviorSubject<number>(0);
  cart = this.cart_items.asObservable()
  counter = this.cart_counter.asObservable()
  constructor() { }

    private updateState() {
    this.cart_counter.next(this.getTotalItems()); 
  }

  add_to_the_cart (product:Product){
    const currentCart = this.cart_items.getValue();
    const existing = currentCart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      currentCart.push({ product, quantity: 1 });
    }
    this.cart_items.next(currentCart);
    this.updateState();
  }

   removeFromCart(productId: number) {
    let currentCart = this.cart_items.getValue();
    currentCart = currentCart.filter(item => item.product.id !== productId);
    this.cart_items.next(currentCart);
    this.updateState();
  }

  changeQuantity(productId: number, change: number) {
    const currentCart = this.cart_items.getValue();
    const item = currentCart.find(i => i.product.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) this.removeFromCart(productId);
      this.cart_items.next(currentCart);
      this.updateState();
    }
    return
  }

  getCartItems() {
    return this.cart_items.asObservable();
  }

  getTotal(): number {
    const cart = this.cart_items.getValue(); 
    return cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  }


  getTotalItems(): number {
  const cart = this.cart_items.getValue(); 
  return cart.reduce((sum, item) => sum + item.quantity, 0);  }
}
