import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from '../players.service';


@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.css'
})
export class EditPlayerComponent implements OnInit {

  @Input() form!: FormGroup;

  player: any;

  // Define the items property to store the products in the cart
  //players = this.playersService.getPlayers();

  ngOnInit() : void {
    const routeParams = this.route.snapshot.paramMap;
    const playerIdFromRoute:any = routeParams.get('playerId');
    console.log("playerIdFromRoute--- "+playerIdFromRoute);
    //this.loadPlayer(playerIdFromRoute);
    this.playersService.getPlayer(playerIdFromRoute).subscribe((player:any) => {
      console.log(player.data);
      this.player = player.data;

      // fills inputs with values
      this.editPlayerForm.patchValue({
        id: this.player._id,
        name: this.player.name,
        jerseyNumber: this.player.jerseyNumber,
        position: this.player.position,
        seasonYear: this.player.seasonYear,
        rushingYards: this.player.rushingYards==undefined?0:this.player.rushingYards,
        touchdownsThrown: this.player.touchdownsThrown==undefined?0:this.player.touchdownsThrown,
        sacks: this.player.sacks==undefined?0:this.player.sacks,
        sacked: this.player.sacked==undefined?0:this.player.sacked,
        fieldGoalsMade: this.player.fieldGoalsMade==undefined?0:this.player.fieldGoalsMade,
        fieldGoalsMissed: this.player.fieldGoalsMissed==undefined?0:this.player.fieldGoalsMissed,
        catchesMade: this.player.catchesMade==undefined?0:this.player.catchesMade
      });
    });
  }

  // To gather the user's name and address, use the FormBuilder group() method to set the checkoutForm property
  editPlayerForm = this.formBuilder.group({
    id: '',
    name: '',
    jerseyNumber: 0,
    position: '',
    seasonYear: 0,
    rushingYards: 0,
    touchdownsThrown: 0,
    sacks: 0,
    sacked: 0,
    fieldGoalsMade: 0,
    fieldGoalsMissed: 0,
    catchesMade: 0
  });

  // Inject the CartService so that the CartComponent can use it by adding it to the constructor().
  constructor(
    private playersService: PlayersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // on submit of form, resets form adn clears the cart
  onSubmit(): void {
    // Process checkout data here
    console.log('Updated Player', this.editPlayerForm.value);
    this.playersService.editPlayer(this.editPlayerForm.value);
    this.editPlayerForm.reset();
    alert('Player Successfully Updated');
    this.router.navigate(['players']);
  }

}
