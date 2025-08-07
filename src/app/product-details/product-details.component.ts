import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { ProductServiceService } from '../services/product-service.service';
import { CartServiceService } from '../services/cart-service.service';

@Component({
    standalone: true,
  selector: 'app-product-details',
  imports: [CommonModule, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  products : Product [] = [];
  product: Product | undefined;
  selectedImage : any = '';
quantity: number = 1;
  constructor(private route: ActivatedRoute, private ps : ProductServiceService, private cartService: CartServiceService, private router: Router) {}
  
 
  ngOnInit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    // this.product = this.products.find(p => p.id === id);
    this.ps.get_product_details(id).subscribe((res:any)=> {
      this.product = res
      this.selectedImage = this.product?.images[0]
    })
  }

  addToCart() {
  if (this.product) {
    for (let i = 0; i < this.quantity; i++) {
      console.log (this.product)
      this.cartService.add_to_the_cart(this.product);
    }
    this.router.navigate(['/cart']);
  }
}
  
    increaseQty() {
  if (this.quantity < this.product?.stock!) {
    this.quantity++;
  }
}

decreaseQty() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

   getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }
}
