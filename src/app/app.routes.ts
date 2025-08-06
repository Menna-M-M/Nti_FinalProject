import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
    {path: '', component: ProductsListComponent,title: 'Products-List'},
    {path: 'product/:id', component:ProductDetailsComponent , title: 'Product-Details'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component:RegisterComponent, title: 'Register'},
    {path: 'cart', component: CartComponent, title: 'Cart'},
    {path: '**', component:NotFoundPageComponent, title: 'Not-Found-Page'}
];
