import { Component, OnInit } from '@angular/core';
import { Result, SearchGame } from 'src/app/models/searchGame';

import { ReleasedGamesService } from 'src/app/services/released-games.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  constructor(private releasedGameService: ReleasedGamesService) {}

  juegosMostrados: Result[] = [];
  juegosEstrenadosUltimaSemana: Result[] = [];
  juegosEstrenadosUltimoMes: Result[] = [];
  juegosEstrenadosUltimosTresMeses: Result[] = [];

  selectedRadio: string = "";

  ngOnInit(): void {
    this.mostrarJuegosEstrenadosUltimaSemana();
  }

  mostrarJuegosEstrenadosUltimaSemana() {
    if (this.juegosEstrenadosUltimaSemana.length > 0) {
      this.juegosMostrados = this.juegosEstrenadosUltimaSemana;
    } else {
      this.releasedGameService.juegosEstrenadosUltimaSemana().subscribe((result: SearchGame) => {
        const games: Result[] = result.results;
        this.juegosEstrenadosUltimaSemana = games;
        this.juegosMostrados = games;
      });
    }
  }
  
  mostrarJuegosEstrenadosUltimoMes() {
    if (this.juegosEstrenadosUltimoMes.length > 0) {
      this.juegosMostrados = this.juegosEstrenadosUltimoMes;
    } else {
      this.releasedGameService.juegosEstrenadosUltimoMes().subscribe((result: SearchGame) => {
        const games: Result[] = result.results;
        this.juegosEstrenadosUltimoMes = games;
        this.juegosMostrados = games;
      });
    }
  }
  
  mostrarJuegosEstrenadosUltimosTresMeses() {
    if (this.juegosEstrenadosUltimosTresMeses.length > 0) {
      this.juegosMostrados = this.juegosEstrenadosUltimosTresMeses;
    } else {
      this.releasedGameService.juegosEstrenadosUltimosTresMeses().subscribe((result: SearchGame) => {
        const games: Result[] = result.results;
        this.juegosEstrenadosUltimosTresMeses = games;
        this.juegosMostrados = games;
        console.log(this.juegosEstrenadosUltimosTresMeses);
      });
    }
  }

}
