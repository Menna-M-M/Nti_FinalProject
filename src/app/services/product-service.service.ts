import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http : HttpClient) { }

  get_products_list(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4000/api/products');
  }

  get_product_details (id:string){
    return this.http.get (`https://dummyjson.com/products/${id}`)
  }
}
