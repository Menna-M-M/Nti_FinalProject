import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartServiceService } from '../../services/cart-service.service';
import { OrderService } from '../../services/orders.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class BuyComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  totalPrice = 0;
  shippingForm!: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartServiceService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Init form
    this.shippingForm = this.fb.group({
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,}$/)]],
      notes: ['']
    });

    const cartSub = this.cartService.cart.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotal();
    });

    this.subscriptions.push(cartSub);
  }

  submitted = false;

get formControls() {
  return this.shippingForm.controls;
}

  placeOrder() {
    this.submitted = true;

    if (this.cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (this.shippingForm.invalid) {
      alert("Please fill all required fields correctly.");
      return;
    }
    

    const orderData = {
      user: "68848372689dbd516fd01b71",  // Hardcoded for now
      products: this.cartItems,
      totalPrice: this.totalPrice,
      shippingInfo: this.shippingForm.value,
      createdAt: new Date()
    };
    console.log(orderData)

    this.cartService.placeOrder(orderData).subscribe({
      next: (res) => {
        alert("🎉 Order placed successfully!");
        this.cartService.clearCart();
        this.cartItems = [];
        this.totalPrice = 0;
        this.shippingForm.reset();
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error(err);
        alert("❌ Failed to place order");
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
