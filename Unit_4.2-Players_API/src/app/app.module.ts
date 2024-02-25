import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    TopBarComponent,
    PlayerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: PlayersComponent },
      { path: 'players/most-touchdown-passes', component: PlayersComponent },
      { path: 'players/most-rushing-yards', component: PlayersComponent },
      { path: 'players/least-rushing-yards', component: PlayersComponent },
      { path: 'players/most-to-least-field-goals', component: PlayersComponent },
      { path: 'players/most-sacks', component: PlayersComponent },
      { path: 'players', component: PlayersComponent },
      { path: 'players/:playerId', component: PlayerDetailsComponent },
      { path: 'add-player', component: AddPlayerComponent },
      { path: 'edit-player/:playerId', component: EditPlayerComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
