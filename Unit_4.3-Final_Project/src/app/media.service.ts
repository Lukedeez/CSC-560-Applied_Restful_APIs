import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';


const BASE_URL = 'http://localhost:8081/api/';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private http = inject(HttpClient);
  media:any[]=[];
  private mediaUrl = 'media/';  // URL to web api

  getMedia(){
    //return this.media;
    return this.http.get(BASE_URL+"media");
  }
  

  addMedia(newMedia:any) {
    let body = new URLSearchParams();
      body.set("redirect_uri", "http://localhost:4200/api/media");
      body.set('Title', newMedia.Title);
      body.set('Year', newMedia.Year);
      body.set('Rated', newMedia.Rated);
      body.set('Released', newMedia.Released);
      body.set('Runtime', newMedia.Runtime);
      body.set('Genre', newMedia.Genre);
      body.set('Plot', newMedia.Plot);
      body.set('Poster', newMedia.Poster);
      body.set('Metascore', newMedia.Metascore);
      body.set('imdbRating', newMedia.imdbRating);
      body.set('imdbVotes', newMedia.imdbVotes);
      body.set('imdbID', newMedia.imdbID);
      body.set('Type', newMedia.Type);
      body.set('watched', newMedia.watched);
      body.set('myRating', newMedia.myRating);
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = { headers: headers };
    this.http.post(BASE_URL+this.mediaUrl, body, options).subscribe((response:any) =>{
      console.log(response);
      this.router.navigate(['media']);
    });
    alert('Media Successfully Added');
  }

  getMovies(){
    return this.media.filter((m: { Type: any; }) => m.Type == "movie").map(a => a);
  }


  getMediaDetail(mediaType:any, mediaId:any) {
    //console.log(mediaType, mediaId);
    return this.http.get(BASE_URL+mediaType+"/"+mediaId);
  }

  getSeries(){
    return this.media.filter((m: { Type: any; }) => m.Type == "series").map(a => a);
  }

  delete(mediaId:any) {
    this.http.delete(BASE_URL+this.mediaUrl+mediaId).subscribe((response:any) =>{
      this.router.navigate(['media']);
    });
    //alert("Media Deleted");
  }

  updateMedia(media:any){
    let body = new URLSearchParams();
      body.set("redirect_uri", "http://localhost:4200/api/media");
      body.set('Title', media.Title);
      body.set('Year', media.Year);
      body.set('Rated', media.Rated);
      body.set('Released', media.Released);
      body.set('Runtime', media.Runtime);
      body.set('Genre', media.Genre);
      body.set('Plot', media.Plot);
      body.set('Poster', media.Poster);
      body.set('Metascore', media.Metascore);
      body.set('imdbRating', media.imdbRating);
      body.set('imdbVotes', media.imdbVotes);
      body.set('imdbID', media.imdbID);
      body.set('Type', media.Type);
      body.set('watched', media.watched);
      //if(media.watched==1){
        body.set('myRating', media.myRating);
      //}

    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = { headers: headers };
    this.http.put(BASE_URL+"media/"+media.id, body, options).subscribe((response:any) =>{
      this.router.navigate(['media/'+media._id]);
    });
  }

  getQueries(item:any) {
    console.log(BASE_URL+item);
    return this.http.get(BASE_URL+item);
  }

  constructor(
    private router: Router
    ) { 
    console.log(this.http.get(BASE_URL+"media"));
    //this.media.push(this.http.get(BASE_URL+"media"));
    //console.log(this.media);
    this.http.get(BASE_URL+"media").subscribe((m:any) => {
      console.log(m.data);
      this.media = m.data;
    });
  }
}
