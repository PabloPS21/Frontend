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

  showSpinner: boolean = false;

  ngOnInit(): void {
    this.mostrarJuegosEstrenadosUltimaSemana();

  }

  mostrarJuegosEstrenadosUltimaSemana() {
    this.page = 1;

    this.showSpinner = true;
    
    const titulo = document.getElementById("titulo");
    if (titulo) titulo!.innerHTML = "Juegos estrenados en la última semana";
  
    let juegosMostradosTemp: Result[] = [];
  
    if (this.juegosEstrenadosUltimaSemana.length > 0) {
      juegosMostradosTemp = this.juegosEstrenadosUltimaSemana;
      this.juegosMostrados = juegosMostradosTemp;
      this.showSpinner = false;
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

          juegosMostradosTemp = this.eliminarJuegosDuplicados(juegosMostradosTemp);
  
          this.juegosMostrados = juegosMostradosTemp

          this.showSpinner = false;
        });
      });
  
    }
  }
  
  mostrarJuegosEstrenadosUltimoMes() {
    this.page = 1;

    this.showSpinner = true;
    
    const titulo = document.getElementById("titulo");
    if (titulo) titulo!.innerHTML = "Juegos estrenados en el último mes";
  
    let juegosMostradosTemp: Result[] = [];
  
    if (this.juegosEstrenadosUltimoMes.length > 0) {
      juegosMostradosTemp = this.juegosEstrenadosUltimoMes;
      this.juegosMostrados = juegosMostradosTemp;
      this.showSpinner = false;
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
  
          juegosMostradosTemp = this.eliminarJuegosDuplicados(juegosMostradosTemp);

          this.juegosMostrados = juegosMostradosTemp;

          this.showSpinner = false;
        });
      });
  
    }
  }
  
  
  mostrarJuegosEstrenadosUltimosTresMeses() {
    this.page = 1;

    this.showSpinner = true;
  
    const titulo = document.getElementById("titulo");
    if (titulo) titulo!.innerHTML = "Juegos estrenados en los últimos tres meses";
  
    let juegosMostradosTemp: Result[] = [];
  
    if (this.juegosEstrenadosUltimosTresMeses.length > 0) {
      juegosMostradosTemp = this.juegosEstrenadosUltimosTresMeses;
      this.juegosMostrados = juegosMostradosTemp;
      this.showSpinner = false;
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

          juegosMostradosTemp = this.eliminarJuegosDuplicados(juegosMostradosTemp);
  
          this.juegosMostrados = juegosMostradosTemp;

          this.showSpinner = false;
        });
      });
    }
  }
  

  eliminarJuegosDuplicados(juegos: Result[]): Result[] {
    const juegosUnicos: Result[] = [];
    const nombresJuegos: Set<string> = new Set();
  
    juegos.forEach((juego) => {
      if (!nombresJuegos.has(juego.name)) {
        nombresJuegos.add(juego.name);
        juegosUnicos.push(juego);
      }
    });
  
    return juegosUnicos;
  }

  onPageChange(event: number): void {
    this.page = event;

    const element = document.getElementById('top');
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  }

  ordenarPuntuacion(): void {
    this.juegosMostrados.sort((a, b) => b.playtime - a.playtime);
    this.page = 1;
  }
  
  ordenarFecha(): void {
    this.juegosMostrados.sort((a, b) => {
      if (a.released && b.released) {
        return new Date(a.released).getTime() - new Date(b.released).getTime();
      } else {
        return 0;
      }
    });
    this.page = 1;
  }
  
  ordenarTitulo(): void {
    this.juegosMostrados.sort((a, b) => a.name.localeCompare(b.name));
    this.page = 1; 
  }

}
