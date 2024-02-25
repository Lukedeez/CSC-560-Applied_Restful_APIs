import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


const BASE_URL = 'http://localhost:8081/api/';

export interface Player {
  _id: number;
  name: string;
  jerseyNumber: number;
  position: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private http = inject(HttpClient);

  players: Player[] = [];  
  
  private playersUrl = 'players/';  // URL to web api

  /** GET players from the server */
  getPlayers(){
    return this.http.get(BASE_URL+this.playersUrl);
  }

  getPlayer(playerID: any) {
      return this.http.get(BASE_URL+this.playersUrl+playerID);
  }

  addPlayer(player: any) {
    //this.items.push(product);
    let body = new URLSearchParams();
      body.set("redirect_uri", "http://localhost:4200/api/players");
      body.set('name', player.name);
      body.set('jerseyNumber', player.jerseyNumber);
      body.set('position', player.position);
      body.set('seasonYear', player.seasonYear);
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = { headers: headers };
    this.http.post(BASE_URL+this.playersUrl, body, options).subscribe((response:any) =>{
      this.router.navigate(['players']);
    });
  }

  editPlayer(player: any) {
    //this.items.push(product);
    let body = new URLSearchParams();
      body.set("redirect_uri", "http://localhost:4200/api/players");
      body.set('name', player.name);
      body.set('jerseyNumber', player.jerseyNumber);
      body.set('position', player.position);
      body.set('seasonYear', player.seasonYear);

      body.set('rushingYards', player.rushingYards);
      if(player.position=="Quarterback"){
        body.set('touchdownsThrown', player.touchdownsThrown);
        body.set('sacked', player.sacked);
      } else {
        body.set('sacks', player.sacks);
      }
      body.set('fieldGoalsMade', player.fieldGoalsMade);
      body.set('fieldGoalsMissed', player.fieldGoalsMissed);
      body.set('catchesMade', player.catchesMade);

    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = { headers: headers };
    this.http.put(BASE_URL+this.playersUrl+player.id, body, options).subscribe((response:any) =>{
      this.router.navigate(['players']);
    });
  }
  
  deletePlayer(player: any) {
    //this.items.push(product);
    this.http.delete(BASE_URL+this.playersUrl+player).subscribe((response:any) =>{
      this.router.navigate(['players']);
    });
  }

  getQueries(item:any) {
    console.log(BASE_URL+item);
    return this.http.get(BASE_URL+item);
  }
  

  // to store the array of the current products in the cart
  //players: Product[] = [];  

  // Inject HttpClient into the CartService constructor().
  constructor(
    //private http: HttpClient
    private router: Router
  ) {}

  // functions
  // appends a product to an array of items
  //addPlayer(player: Player) {
    //this.items.push(product);
  //}

  // collects the items users add to the cart and returns each item with its associated quantity
  //getPlayers() {
    //return this.items;
    //console.log('getPlayers');
    //return this.http.get('http://localhost:8081/api/players/');
  //}

  // returns an empty array of items
  //deletePlayer() {
    //this.items = [];
    //return this.items;
  //}

  // get shipping data, from shipping.json
  // getPlayer() {
  //   return this.http.get('http://localhost:8081/api/players/');
  // }

}
