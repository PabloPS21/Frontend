import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { Result, SearchGame } from 'src/app/models/searchGame';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchResults: Result[] = [];
  query: string = '';

  numPages: number = 0;
  page: number = 1;

  loading: boolean = true;

  constructor(
    private searchService: SearchBarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.obtenerJuegos();
      
    });

    this.obtenerJuegos();

  }

  obtenerJuegos() {
    this.page = 1;

    this.searchService.searchGamesPage(this.query, this.page).subscribe((result: SearchGame) => {
      const games: Result[] = result.results
      this.numPages = Math.ceil(result.count / 20);

      this.searchResults = games;

      const requests = [];
        for (let i = 2; i <= this.numPages; i++) {
          requests.push(this.searchService.searchGamesPage(this.query, i));
        }

        forkJoin(requests).subscribe((results: SearchGame[]) => {
          const additionalGames = results.flatMap((result: SearchGame) => result.results);
          this.searchResults.push(...additionalGames);
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
    this.searchResults.sort((a, b) => b.playtime - a.playtime);
    this.page = 1;
  }
  
  ordenarFecha(): void {
    this.searchResults.sort((a, b) => {
      if (a.released && b.released) {
        return new Date(b.released).getTime() - new Date(a.released).getTime();
      } else {
        return 0;
      }
    });
    this.page = 1;
  }
  
  ordenarTitulo(): void {
    this.searchResults.sort((a, b) => a.name.localeCompare(b.name));
    this.page = 1; 
  }

}