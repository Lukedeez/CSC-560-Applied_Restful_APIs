import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../media.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  selected: any=false;
  media: any[] = [];

  ngOnInit(): void {
    //this.media = this.mediaService.getMovies();
    //console.log(this.media);
    if(this.route.routeConfig?.path=="movies/:mediaId") {
      const routeParams = this.route.snapshot.paramMap;
      const mediaIdFromRoute:any = routeParams.get('mediaId');
      console.log(routeParams);
      this.mediaService.getMediaDetail("movies", mediaIdFromRoute).subscribe((m:any) => {
        var arr = [];
        arr.push(m.data);
        this.media = arr;
        this.selected = true;
      });
    } else {
      this.mediaService.getMedia().subscribe((m:any) => {
        this.media = m.data.filter((m: { Type: any; }) => m.Type == "movie").map((a: any) => a);
        console.log(this.media);
        this.selected = false;
      });
    }
    
  }


  deleteMedia(mediaId:any) {
    //alert("Delete "+this.media[0].Title+"?");
    if(confirm("Are you sure to delete "+this.media[0].Title+"?")) {
      console.log('Deleted Media', mediaId);
      this.mediaService.delete(mediaId);
    }
    
  }



  constructor(
    private mediaService: MediaService,
    private route : ActivatedRoute
  ){ }

}
