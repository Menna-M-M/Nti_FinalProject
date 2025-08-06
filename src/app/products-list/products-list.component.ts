import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../types/product';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  products : Product [] =[];

  constructor (private ps: ProductServiceService){}

   ngOnInit(): void {
    this.ps.get_products_list().subscribe({
      next: (response : any) => {
        this.products = response.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
