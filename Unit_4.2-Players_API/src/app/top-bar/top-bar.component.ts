import { Component, NgModule, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from '../players.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class TopBarComponent {

   constructor(
    private route: ActivatedRoute, 
    private router: Router
    ){ }

   currentRoute: any;
   selected: any;
   open: any;

    routes = [
      {
        value: 'Most Touchdown Passes',
        url: 'players/most-touchdown-passes'
      },
      {
        value: 'Most Rushing Yards',
        url: 'players/most-rushing-yards'
      },
      {
        value: 'Least Rushing Yards',
        url: 'players/least-rushing-yards'
      },
      {
        value: 'Most to Least Field Goals',
        url: 'players/most-to-least-field-goals'
      },
      {
        value: 'Most Sacks',
        url: 'players/most-sacks'
      }
    ];

    routeTo(e:any) {
      this.router.navigate(['/' + e]);
    }
    

    ngOnInit() {
      this.currentRoute = '';
    }

}