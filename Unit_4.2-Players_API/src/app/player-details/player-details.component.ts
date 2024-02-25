import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../players.service';
//import { Player } from '../players';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.css'
})
export class PlayerDetailsComponent implements OnInit {

  player: any;

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService
  ) { }

  ngOnInit() : void {
    const routeParams = this.route.snapshot.paramMap;
    const playerIdFromRoute:any = routeParams.get('playerId');
    console.log("playerIdFromRoute--- "+playerIdFromRoute);
    //this.loadPlayer(playerIdFromRoute);
    this.playersService.getPlayer(playerIdFromRoute).subscribe((player:any) => {
      console.log(player.data);
      this.player = player.data;
    });
  }

  // delete player
  delete(playerId:any) {
    if(confirm("Are you sure you want to delete this player?")) {
      this.playersService.deletePlayer(playerId);
      window.alert('Player has been deleted!');
    }
  }


}
