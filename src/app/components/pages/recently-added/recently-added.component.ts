import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ReducedResult } from 'src/app/models/reducedResult';
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

  sessionStorage: Storage = window.sessionStorage;

  juegosMostrados: ReducedResult[] = [];
  juegosEstrenadosUltimaSemana: Result[] = [];
  juegosEstrenadosUltimoMes: Result[] = [];
  juegosEstrenadosUltimosTresMeses: Result[] = [];

  ultimaSemanaReduced: ReducedResult[] = [];
  ultimoMesReduced: ReducedResult[] = [];
  ultimosTresMesesReduced: ReducedResult[] = [];

  selectedRadio: string = "";

  numPages: number = 0;
  page: number = 1;

  showSpinner: boolean = false;

  ngOnInit(): void {
    this.mostrarJuegosEstrenadosUltimaSemana();

    const element = document.getElementById('top');
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  }

  mostrarJuegosEstrenadosUltimaSemana() {
    this.page = 1;

    this.showSpinner = true;
    
    const titulo = document.getElementById("titulo");
    if (titulo) titulo!.innerHTML = "Juegos estrenados en la última semana";

    var semanaLocal = sessionStorage.getItem("juegosSemanaReduced")
  
    if (semanaLocal) {

      var juegosSemanaReduced = JSON.parse(semanaLocal) as ReducedResult[];
      this.juegosMostrados = juegosSemanaReduced;
      this.showSpinner = false;

    } else {
      this.releasedGameService.juegosEstrenadosUltimaSemana(1).subscribe((result: SearchGame) => {
        const games: Result[] = result.results;
        this.numPages = Math.ceil(result.count / 20);
        this.juegosEstrenadosUltimaSemana = games;
        this.juegosMostrados = games;
  
        const requests = [];
        for (let i = 2; i <= this.numPages; i++) {
          requests.push(this.releasedGameService.juegosEstrenadosUltimaSemana(i));
        }
  
        forkJoin(requests).subscribe((results: SearchGame[]) => {
          const additionalGames = results.flatMap((result: SearchGame) => result.results);
          this.juegosEstrenadosUltimaSemana.push(...additionalGames);
          
          this.juegosMostrados = this.juegosEstrenadosUltimaSemana;
  
          this.juegosMostrados = this.eliminarJuegosDuplicados(this.juegosMostrados);
  
          this.showSpinner = false;

          this.ultimaSemanaReduced = this.juegosEstrenadosUltimaSemana.map(game => {
            return {
              slug: game.slug,
              name: game.name,
              background_image: game.background_image,
              id: game.id,
              released: game.released,
              playtime: game.playtime
            }
          });
      
          sessionStorage.setItem('juegosSemanaReduced', JSON.stringify(this.ultimaSemanaReduced));

        });
      });
    }

  }
  
  mostrarJuegosEstrenadosUltimoMes() {
    this.page = 1;

    this.showSpinner = true;
    
    const titulo = document.getElementById("titulo");
    if (titulo) titulo!.innerHTML = "Juegos estrenados en el último mes";

    var mesLocal = sessionStorage.getItem("juegosMesReduced")
  
    if (mesLocal) {
      var juegosMesReduced = JSON.parse(mesLocal) as ReducedResult[];
      this.juegosMostrados = juegosMesReduced; 
      this.showSpinner = false;
    } else {
      this.releasedGameService.juegosEstrenadosUltimoMes(1).subscribe((result: SearchGame) => {
        const games: Result[] = result.results;
        this.numPages = Math.ceil(result.count / 20);
        this.juegosEstrenadosUltimoMes = games;
        this.juegosMostrados = games;
  
        const requests = [];
        for (let i = 2; i <= this.numPages; i++) {
          requests.push(this.releasedGameService.juegosEstrenadosUltimoMes(i));
        }
  
        forkJoin(requests).subscribe((results: SearchGame[]) => {
          const additionalGames = results.flatMap((result: SearchGame) => result.results);
          this.juegosEstrenadosUltimoMes.push(...additionalGames);
          
          this.juegosMostrados = this.juegosEstrenadosUltimoMes;
  
          this.juegosMostrados = this.eliminarJuegosDuplicados(this.juegosMostrados);

          this.showSpinner = false;

          this.ultimoMesReduced = this.juegosEstrenadosUltimoMes.map(game => {
            return {
              slug: game.slug,
              name: game.name,
              background_image: game.background_image,
              id: game.id,
              released: game.released,
              playtime: game.playtime
            }
          });
      
          sessionStorage.setItem('juegosMesReduced', JSON.stringify(this.ultimoMesReduced));
        });
      });
  
    }
  }
  
  
  mostrarJuegosEstrenadosUltimosTresMeses() {
    this.page = 1;

    this.showSpinner = true;
  
    const titulo = document.getElementById("titulo");
    if (titulo) titulo!.innerHTML = "Juegos estrenados en los últimos tres meses";

    var tresMesesLocal = sessionStorage.getItem("juegosTresMesesReduced")
  
    if (tresMesesLocal) {
      var juegosTresMesesReduced = JSON.parse(tresMesesLocal) as ReducedResult[];
      this.juegosMostrados = juegosTresMesesReduced; 
      this.showSpinner = false;
    } else {
      this.releasedGameService.juegosEstrenadosUltimosTresMeses(1).subscribe((result: SearchGame) => {
        this.numPages = Math.ceil(result.count / 20);
        const games: Result[] = result.results;
        this.juegosEstrenadosUltimosTresMeses = games;
        this.juegosMostrados = games;
  
        const requests = [];
        for (let i = 2; i <= 100; i++) {
          requests.push(this.releasedGameService.juegosEstrenadosUltimosTresMeses(i));
        }
  
        forkJoin(requests).subscribe((results: SearchGame[]) => {
          const additionalGames = results.flatMap((result: SearchGame) => result.results);
          this.juegosEstrenadosUltimosTresMeses.push(...additionalGames);
        
          this.juegosMostrados = this.juegosEstrenadosUltimosTresMeses;
  
          this.juegosMostrados = this.eliminarJuegosDuplicados(this.juegosMostrados);

          this.showSpinner = false;

          this.ultimosTresMesesReduced = this.juegosEstrenadosUltimosTresMeses.map(game => {
            return {
              slug: game.slug,
              name: game.name,
              background_image: game.background_image,
              id: game.id,
              released: game.released,
              playtime: game.playtime
            }
          });
      
          sessionStorage.setItem('juegosTresMesesReduced', JSON.stringify(this.ultimosTresMesesReduced));

        });
      });
    }
  }
  

  eliminarJuegosDuplicados(juegos: ReducedResult[]): ReducedResult[] {
    const juegosUnicos: ReducedResult[] = [];
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
