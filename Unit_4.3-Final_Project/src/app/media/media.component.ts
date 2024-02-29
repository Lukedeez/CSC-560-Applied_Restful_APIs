import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MediaService } from '../media.service';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { AnyTxtRecord } from 'dns';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent implements OnInit {

  @Input() form!: FormGroup;
  selected:any = false;
  media: any[] = [];
  med:any;
  watched:any;
  mediaType:any;
  queried: any = false;
  value:any;

  ngOnInit(): void {

    for (let routeUrl of this.topBar.routes) {
      if (this.route.routeConfig?.path == routeUrl.url) {
        //console.log(routeUrl.url);
        let n = routeUrl.url.lastIndexOf('/');
        let r = routeUrl.url.substring(n + 1);
        this.selected = r.replace(/-/g, ' ').toUpperCase(); // show which stats are displayed
        this.queried = true;
        this.value=routeUrl.value;
        this.loadQuery(routeUrl.url);
        console.log(routeUrl.url);
        break;
      }
    }
    
    const routeParams = this.route.snapshot.paramMap;
    const mediaIdFromRoute:any = routeParams.get('mediaId');
    console.log(routeParams);
    console.log(this.route.routeConfig?.path);


    if(this.route.routeConfig?.path=="media/:mediaId" && !this.queried) {
      console.log("media id");
      this.mediaService.getMediaDetail("media", mediaIdFromRoute).subscribe((m:any) => {
        var arr = [];
        arr.push(m.data);
        this.media = arr;
        this.med = m.data;
        this.selected = true;

        // fills inputs with values
        this.editMediaForm.patchValue({
          id: this.med._id,
          Title: this.med.Title,
          Year: this.med.Year,
          Rated: this.med.Rated,
          Released: this.med.Released,
          Runtime: this.med.Runtime,
          Genre: this.med.Genre,
          Plot: this.med.Plot,
          Poster: this.med.Poster,
          Metascore: this.med.Metascore,
          imdbRating: this.med.imdbRating,
          imdbVotes: this.med.imdbVotes,
          imdbID: this.med.imdbID,
          Type: this.med.Type,
          watched: this.med.watched,
          myRating: this.med.myRating
        });
        this.watched = this.med.watched;
        this.mediaType = this.med.Type;

      });
    } else if (!this.queried) {
      this.mediaService.getMedia().subscribe((m:any) => {
        console.log(m.data);
        this.media = m.data;
      });
    }
  
  }

  loadQuery(url:any) {
    console.log(url);
    this.mediaService.getQueries(url).subscribe((m:any) => {
      console.log(m);
      if(m.media instanceof Array){
        //console.log("Is an array");
        this.media = m.media;
      } else {
        //console.log("NOT an array");
        var arr = [];
        arr.push(m.media);
        this.media = arr;
      }
    });
  }


  isWatched(e:any) {
    console.log(e.target.value);
    this.watched = e.target.value;
  }
  isType(e:any) {
    console.log(e.target.value);
    this.mediaType = e.target.value;
  }


  onSubmit(): void {
    console.log('Updated Media', this.editMediaForm.value);
    this.mediaService.updateMedia(this.editMediaForm.value);
    this.editMediaForm.reset();
    alert('Media Successfully Updated');
    this.router.navigate(['media']);
  }


  editMediaForm = this.formBuilder.group({
    id: '',
    Title: '',
    Year: '',
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Plot: '',
    Poster: '',
    Metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbID: '',
    Type: '',
    watched: 0,
    myRating: 0
  });

  constructor(
    private mediaService: MediaService,
    private route : ActivatedRoute,
    private router: Router,
    private topBar: TopBarComponent,
    private formBuilder: FormBuilder
  ){}

}
