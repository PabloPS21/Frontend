import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Result, SearchGame } from 'src/app/models/searchGame';
import { DevelopersService } from 'src/app/services/developers.service';

@Component({
  selector: 'app-games-results-developers',
  templateUrl: './games-results-developers.component.html',
  styleUrls: ['./games-results-developers.component.css']
})
export class GamesResultsDevelopersComponent implements OnInit{

  developerId: number = 0;
  developerName: string = '';
  gameResults: Result[] = [];

  page: number = 0;
  numPages: number = 0;

  loading: boolean = true;

  constructor(
    private developerService: DevelopersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.developerId = params['developerId'];
      this.developerName = params['developer'];
    })

    this.obtenerJuegos(this.developerName) 

  }

  obtenerJuegos(developerName: string): void {
    this.page = 1;

    this.developerService.getGamesByDevelopersName(this.page, developerName).subscribe((result: SearchGame) =>{
      const games: Result[] = result.results;

      this.gameResults = games;

      this.numPages = Math.ceil(result.count / 20);

      const requests = [];

        
       for (let i = 2; i <= this.numPages ; i++) {
          requests.push(this.developerService.getGamesByDevelopersName(i, developerName));
        }

        forkJoin(requests).subscribe((results: SearchGame[]) => {
          const additionalGames = results.flatMap((result: SearchGame) => result.results);
          this.gameResults.push(...additionalGames);
          
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
