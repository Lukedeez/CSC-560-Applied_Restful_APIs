import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrl: './add-media.component.css'
})
export class AddMediaComponent {

  @Input({ required: true }) Title!: String;
  watched:any=0;

  addMediaForm = this.formBuilder.group({
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

  isWatched(e:any) {
    console.log(e.target.value);
    this.watched = e.target.value;
  }

  // process newly added media
  onSubmit(): void {
    console.log(this.addMediaForm.value.Title);
    if(this.addMediaForm.value.Title!="" && this.addMediaForm.value.Year!="") {
      console.log('New Media Added', this.addMediaForm.value);
      this.mediaService.addMedia(this.addMediaForm.value);
      this.addMediaForm.reset();
    } else {
      console.log('Title or Year is empty');
      alert("Media Title or Year is empty");
    }
  }

  constructor(
    private mediaService: MediaService,
    private formBuilder: FormBuilder
  ) { }

}