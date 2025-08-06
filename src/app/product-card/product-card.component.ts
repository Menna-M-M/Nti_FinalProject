import { Component, Input } from '@angular/core';
import { Product } from '../types/product';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-product-card',
  imports: [NgClass, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

   constructor(private cartService: CartServiceService) {}

  addToCart() {
    this.cartService.add_to_the_cart(this.product);
  }
  
  getStockStatus(): string {
    return this.product.stock > 0 ? 'In stock' : 'Out of stock';
  }

  getStockClass(): string {
    return this.product.stock > 0 ? 'text-success' : 'text-danger';
  }

  getStars(rating: number): number[] {
  const safeRating = Math.floor(rating ?? 0); // fallback to 0 if undefined
  return Array.from({ length: safeRating });
}

}
