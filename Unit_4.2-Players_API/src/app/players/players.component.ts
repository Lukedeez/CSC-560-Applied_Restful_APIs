import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../players.service';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {

  cnt : any = 0;
  players : any = [];
  selected: any = "Players";
  queried: any = false;

  constructor(
    private playersService: PlayersService,
    private topBar: TopBarComponent,
    private route : ActivatedRoute
  ) { }

  ngOnInit() : void {
    
    // load players or player stats
    if (this.route.routeConfig?.path != "players" && this.route.routeConfig?.path != "") {
      for (let routeUrl of this.topBar.routes) {
        if (this.route.routeConfig?.path == routeUrl.url) {
          //console.log(routeUrl.url);
          let n = routeUrl.url.lastIndexOf('/');
          let r = routeUrl.url.substring(n + 1);
          this.selected = r.replace(/-/g, ' ').toUpperCase(); // show which stats are displayed
          this.queried = true;
          this.loadQuery(routeUrl.url);
          break;
        }
      }
    } else {
      this.loadPlayers();
    }
  }

  // load all players
  loadPlayers() {
    this.playersService.getPlayers().subscribe((players:any) => {
      //console.log(players.data);
      this.players = players.data;
    });
  }

  // query top player stats
  loadQuery(url:any) {
    console.log(url);
    this.playersService.getQueries(url).subscribe((players:any) => {
      if(players.player instanceof Array){
        //console.log("Is an array");
        this.players = players.player;
      } else {
        //console.log("NOT an array");
        var arr = [];
        arr.push(players.player);
        this.players = arr;
      }
    });
  }

}