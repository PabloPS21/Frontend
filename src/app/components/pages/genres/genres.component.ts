import { Component, OnInit } from '@angular/core';
import { GenreModel, GenreResult } from 'src/app/models/genres';
import { GenresService } from 'src/app/services/genres.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  
  genreResults : GenreResult[] = []; 

  constructor (
    private genreService: GenresService
  ) {}

  ngOnInit(): void {
    this.obtenerGeneros();
  }

  obtenerGeneros(): void {
    this.genreService.getGenres().subscribe((result: GenreModel) => {
      this.genreResults = result.results;
      console.log(this.genreResults);
    })
  }

}
