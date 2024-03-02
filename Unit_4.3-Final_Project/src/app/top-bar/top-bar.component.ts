import { Component, OnInit, NgModule, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class TopBarComponent implements OnInit {

  currentRoute: any;

  routes = [
    {
      value: 'Most Voted Media',
      url: 'media/most-voted'
    },
    {
      value: 'Movies Newest to Oldest',
      url: 'media/movies-new-to-old'
    },
    {
      value: 'Movie Ratings High to Low',
      url: 'media/movie-ratings'
    },
    {
      value: 'Series Ratings High to Low',
      url: 'media/series-ratings'
    },
    {
      value: 'My Ratings High to Low',
      url: 'media/watched-ratings'
    }
  ];

  ngOnInit() : void {
    this.currentRoute = '';
  }

  routeTo(e:any) {
    this.router.navigate(['/' + e]);
  }

  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) { }

}