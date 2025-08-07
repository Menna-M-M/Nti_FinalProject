import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { CartComponent } from './cart/cart.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BuyComponent } from './buy/buy/buy.component';
import { OrdersComponent } from './orders/orders.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyResetComponent } from './verify-reset/verify-reset.component';

export const routes: Routes = [
    {path: '', component: ProductsListComponent,title: 'Products-List'},
    {path: 'product/:id', component:ProductDetailsComponent , title: 'Product-Details'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component:RegisterComponent, title: 'Register'},
    {path: 'forgot-password', component:ForgotPasswordComponent, title: 'forgot-pass'},
    {path: 'reset-password', component: ResetPasswordComponent , title: 'reset-pass'},
    {path: 'verify-reset', component: VerifyResetComponent , title: 'verify-pass'},
    {path: 'cart', component: CartComponent, title: 'Cart'},
    {path: 'buy_now', component: BuyComponent, title: 'Buy'},
    { path: 'orders', component: OrdersComponent, title: 'Orders' },
    {path: '**', component:NotFoundPageComponent, title: 'Not-Found-Page'}
];
