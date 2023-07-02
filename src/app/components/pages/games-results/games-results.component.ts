import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Result, SearchGame } from 'src/app/models/searchGame';
import { GenresService } from 'src/app/services/genres.service';

@Component({
  selector: 'app-games-results',
  templateUrl: './games-results.component.html',
  styleUrls: ['./games-results.component.css']
})
export class GamesResultsComponent implements OnInit {

  genreId: number = 0;
  genreName: string = '';
  gameResults: Result[] = [];

  page: number = 0;

  loading: boolean = true;

  constructor(
    private genresService: GenresService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.genreId = params['genreId'];
      this.genreName = params['genre'];
      console.log(this.genreName)
    })

    this.obtenerJuegos(this.genreId)

  }

  obtenerJuegos(genreId: number): void {
    this.page = 1;

    this.genresService.getGamesByGenreId(genreId, this.page).subscribe((result: SearchGame) =>{
      const games: Result[] = result.results;
      this.gameResults = games;

      const requests = [];

        //Obtiene solamente 10 páginas de 20 cada una
        for (let i = 2; i <= 10; i++) {
          requests.push(this.genresService.getGamesByGenreId(genreId, i));
        }

        forkJoin(requests).subscribe((results: SearchGame[]) => {
          const additionalGames = results.flatMap((result: SearchGame) => result.results);
          this.gameResults.push(...additionalGames);
          console.log(this.gameResults)
        })
      
        this.loading = false;
    })
  }

  onPageChange(event: number): void {
    this.page = event;

    const element = document.getElementById('top');
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  }

  //Ordena por tiempo de juego
  ordenarPuntuacion(): void {
    this.gameResults.sort((a, b) => b.playtime - a.playtime);
    this.page = 1;
  }
  
  ordenarFecha(): void {
    this.gameResults.sort((a, b) => {
      if (a.released && b.released) {
        return new Date(b.released).getTime() - new Date(a.released).getTime();
      } else {
        return 0;
      }
    });
    this.page = 1;
  }
  
  ordenarTitulo(): void {
    this.gameResults.sort((a, b) => a.name.localeCompare(b.name));
    this.page = 1; 
  }

}
