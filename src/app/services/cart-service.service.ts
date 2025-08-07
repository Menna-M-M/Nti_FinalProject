import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cart_items = new BehaviorSubject<CartItem[]>([]);
  private cart_counter = new BehaviorSubject<number>(0);

  cart = this.cart_items.asObservable();
  counter = this.cart_counter.asObservable();

  private baseUrl = 'http://localhost:4000/api/cart';
  private userId = '68848372689dbd516fd01b71'; // Replace with real user ID from auth/session later

  constructor(private http: HttpClient) {
    this.loadCartFromServer();
  }

  private updateState() {
    this.cart_counter.next(this.getTotalItems());
  }

  loadCartFromServer() {
    this.http.get<any>(`${this.baseUrl}/${this.userId}`).subscribe((res) => {
          console.log('Cart response:', res); // Add this

    const mappedItems = res.items.map((item: any) => ({
      product: item.productId,     
      quantity: item.quantity
    }));

    this.cart_items.next(mappedItems);       this.updateState();
    });
    
  }

  add_to_the_cart(product: Product) {
    const payload = {
      userId: this.userId,
      product,
      quantity: 1
    };
    this.http.post<any>(`${this.baseUrl}/add`, payload).subscribe((res) => {
      this.cart_items.next(res.items || []);
      this.updateState();
    });
  }

removeFromCart(product: any) {
  const productId = product._id || product.id || product;
  this.http.delete<any>(`${this.baseUrl}/${this.userId}/${productId}`).subscribe((res) => {
    const mappedItems = res.items.map((item: any) => ({
      product: item.productId,
      quantity: item.quantity
    }));
    this.cart_items.next(mappedItems);
    this.updateState();
  });
}

  changeQuantity(productId: string, change: number) {
    const payload = {
      userId: this.userId,
      productId,
      quantity: change
    };
    this.http.put<any>(`${this.baseUrl}/update-quantity`, payload).subscribe((res) => {
      this.cart_items.next(res.items || []);
      this.updateState();
    });
  }

  getCartItems() {
    return this.cart_items.asObservable();
  }

  getTotal(): number {
  const cart = this.cart_items.getValue();
  return cart.reduce((sum, item) => {
    const price = item?.product?.price;
    if (price !== undefined && item.quantity !== undefined) {
      return sum + item.quantity * price;
    }
    return sum; // skip invalid item
  }, 0);
}


  getTotalItems(): number {
    const cart = this.cart_items.getValue();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }


  clearCart() {
  this.cart_items.next([]);
  this.cart_counter.next(0);
}

}
