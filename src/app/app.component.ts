import { Component } from '@angular/core';
import { Product } from './types/product'
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-app';
}