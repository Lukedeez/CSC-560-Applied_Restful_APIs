import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {

  // Define the items property to store the products in the cart
  //players = this.playersService.getPlayers();

  // To gather the user's name and address, use the FormBuilder group() method to set the checkoutForm property
  addPlayerForm = this.formBuilder.group({
    name: '',
    jerseyNumber: 0,
    position: '',
    seasonYear: new Date().getFullYear()
  });

  // Inject the CartService so that the CartComponent can use it by adding it to the constructor().
  constructor(
    private playersService: PlayersService,
    private formBuilder: FormBuilder
  ) { }

  // on submit of form, resets form adn clears the cart
  onSubmit(): void {
    // Process checkout data here
    console.log('New Player Added', this.addPlayerForm.value);
    this.playersService.addPlayer(this.addPlayerForm.value);
    this.addPlayerForm.reset();
    alert('Player Successfully Added');
  }

}
