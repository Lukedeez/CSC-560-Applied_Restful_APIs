import { HttpClient } from '@angular/common/http';
import { Product } from './products';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class CartService {

  // to store the array of the current products in the cart
  items: Product[] = [];  

  // Inject HttpClient into the CartService constructor().
  constructor(
    private http: HttpClient
  ) {}

  // functions
  // appends a product to an array of items
  addToCart(product: Product) {
    this.items.push(product);
  }

  // collects the items users add to the cart and returns each item with its associated quantity
  getItems() {
    return this.items;
  }

  // returns an empty array of items
  clearCart() {
    this.items = [];
    return this.items;
  }

  // get shipping data, from shipping.json
  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }


}
