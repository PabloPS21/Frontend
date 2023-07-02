import { Component, Input } from '@angular/core';
import { GenreResult } from 'src/app/models/genres';

@Component({
  selector: 'app-genres-card',
  templateUrl: './genres-card.component.html',
  styleUrls: ['./genres-card.component.css']
})
export class GenresCardComponent {

  @Input() genre!: GenreResult;
  
}
