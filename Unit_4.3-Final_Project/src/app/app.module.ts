import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MediaComponent } from './media/media.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SeriesComponent } from './series/series.component';
import { AddMediaComponent } from './add-media/add-media.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    TopBarComponent,
    MediaComponent,
    SeriesComponent,
    AddMediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'media/movies-new-to-old', component: MediaComponent },
        { path: 'media/movie-ratings', component: MediaComponent },
        { path: 'media/watched-ratings', component: MediaComponent },
        { path: 'media/most-voted', component: MediaComponent },
        { path: 'media/series-ratings', component: MediaComponent },
      { path: '', component: MediaComponent },
      { path: 'media', component: MediaComponent },
      { path: 'media/:mediaId', component: MediaComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'series/:mediaId', component: SeriesComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movies/:mediaId', component: MoviesComponent },
      { path: 'add-media', component: AddMediaComponent }
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
