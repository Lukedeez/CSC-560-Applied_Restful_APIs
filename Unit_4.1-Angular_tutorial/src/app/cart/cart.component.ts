import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  // Define the items property to store the products in the cart
  items = this.cartService.getItems();

  // To gather the user's name and address, use the FormBuilder group() method to set the checkoutForm property
  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  // Inject the CartService so that the CartComponent can use it by adding it to the constructor().
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  // on submit of form, resets form adn clears the cart
  onSubmit(): void {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

}
