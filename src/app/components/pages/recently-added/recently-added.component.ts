import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Result, SearchGame } from 'src/app/models/searchGame';

import { ReleasedGamesService } from 'src/app/services/released-games.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  constructor(
    private releasedGameService: ReleasedGamesService) {}

  juegosMostrados: Result[] = [];
  juegosEstrenadosUltimaSemana: Result[] = [];
  juegosEstrenadosUltimoMes: Result[] = [];
  juegosEstrenadosUltimosTresMeses: Result[] = [];

  selectedRadio: string = "";

  numPages: number = 0;
  page: number = 1;


  ngOnInit(): void {
    this.mostrarJuegosEstrenadosUltimaSemana();

  }

  mostrarJuegosEstrenadosUltimaSemana() {
    this.page = 1;
    
    const titulo = document.getElementById("titulo");
    if (titulo) titulo!.innerHTML = "Juegos estrenados en la última semana";
  
    let juegosMostradosTemp: Result[] = [];
  
    if (this.juegosEstrenadosUltimaSemana.length > 0) {
      juegosMostradosTemp = this.juegosEstrenadosUltimaSemana;
      this.juegosMostrados = juegosMostradosTemp;
    } else {
      this.releasedGameService.juegosEstrenadosUltimaSemana(1).subscribe((result: SearchGame) => {
        const games: Result[] = result.results;
        this.numPages = Math.ceil(result.count / 20);
        this.juegosEstrenadosUltimaSemana = games;
        juegosMostradosTemp = games;
  
        const requests = [];
        for (let i = 2; i <= this.numPages; i++) {
          requests.push(this.releasedGameService.juegosEstrenadosUltimaSemana(i));
        }
  
        forkJoin(requests).subscribe((results: SearchGame[]) => {
          const additionalGames = results.flatMap((result: SearchGame) => result.results);
          this.juegosEstrenadosUltimaSemana.push(...additionalGames);
          juegosMostradosTemp.push(...additionalGames);
  
          this.juegosMostrados = juegosMostradosTemp
        });
      });
  
    }
  }
  
  mostrarJuegosEstrenadosUltimoMes() {
    this.page = 1;
    
    const titulo = document.getElementById("titulo");
    if (titulo) titulo!.innerHTML = "Juegos estrenados en el último mes";
  
    let juegosMostradosTemp: Result[] = [];
  
    if (this.juegosEstrenadosUltimoMes.length > 0) {
      juegosMostradosTemp = this.juegosEstrenadosUltimoMes;
      this.juegosMostrados = juegosMostradosTemp;
    } else {
      this.releasedGameService.juegosEstrenadosUltimoMes(1).subscribe((result: SearchGame) => {
        const games: Result[] = result.results;
        this.numPages = Math.ceil(result.count / 20);
        this.juegosEstrenadosUltimoMes = games;
        juegosMostradosTemp = games;
  
        const requests = [];
        for (let i = 2; i <= this.numPages; i++) {
          requests.push(this.releasedGameService.juegosEstrenadosUltimoMes(i));
        }
  
        forkJoin(requests).subscribe((results: SearchGame[]) => {
          const additionalGames = results.flatMap((result: SearchGame) => result.results);
          this.juegosEstrenadosUltimoMes.push(...additionalGames);
          juegosMostradosTemp.push(...additionalGames);
  
          this.juegosMostrados = juegosMostradosTemp
        });
      });
  
    }
  }
  
  
  mostrarJuegosEstrenadosUltimosTresMeses() {
    this.page = 1;
  
    const titulo = document.getElementById("titulo");
    if (titulo) titulo!.innerHTML = "Juegos estrenados en los últimos tres meses";
  
    let juegosMostradosTemp: Result[] = [];
  
    if (this.juegosEstrenadosUltimosTresMeses.length > 0) {
      juegosMostradosTemp = this.juegosEstrenadosUltimosTresMeses;
      this.juegosMostrados = juegosMostradosTemp;
    } else {
      this.releasedGameService.juegosEstrenadosUltimosTresMeses(1).subscribe((result: SearchGame) => {
        this.numPages = Math.ceil(result.count / 20);
        const games: Result[] = result.results;
        this.juegosEstrenadosUltimosTresMeses = games;
        juegosMostradosTemp = games;
  
        const requests = [];
        for (let i = 2; i <= 100; i++) {
          requests.push(this.releasedGameService.juegosEstrenadosUltimosTresMeses(i));
        }
  
        forkJoin(requests).subscribe((results: SearchGame[]) => {
          const additionalGames = results.flatMap((result: SearchGame) => result.results);
          this.juegosEstrenadosUltimosTresMeses.push(...additionalGames);
          juegosMostradosTemp.push(...additionalGames);
  
          this.juegosMostrados = juegosMostradosTemp;
        });
      });
    }
  }
  


  onPageChange(event: number): void {
    this.page = event;

    const element = document.getElementById('top');
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  }

}
