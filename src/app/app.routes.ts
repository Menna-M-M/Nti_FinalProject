import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BuyComponent } from './buy/buy/buy.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';

export const routes: Routes = [
    { path: 'products/add', component: AddProductComponent },
    { path: 'products/edit/:id', component: EditProductComponent },
    { path: 'buy', component: BuyComponent },
    {path: '', component: ProductsListComponent,title: 'Products-List'},
    {path: 'product/:id', component:ProductDetailsComponent , title: 'Product-Details'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component:RegisterComponent, title: 'Register'},
    {path: 'cart', component: CartComponent, title: 'Cart'},
    {path: '**', component:NotFoundPageComponent, title: 'Not-Found-Page'}
];
