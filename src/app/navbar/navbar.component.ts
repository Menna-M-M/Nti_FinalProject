import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartCount = 0;

  constructor(private cartService: CartServiceService) {
    this.cartService.counter.subscribe(count => this.cartCount = count);
  }
}
