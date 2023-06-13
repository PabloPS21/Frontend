import { Component, OnInit } from '@angular/core';

import { ReleasedGamesService } from 'src/app/services/released-games.service';
import { SearchGame } from 'src/app/models/searchGame';
import { Result } from 'src/app/models/searchGame';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private releasedGameService: ReleasedGamesService) {}

  juegosEstrenados: Result[] = [];

  ngOnInit() {
    this.mostrarJuegosEstrenados();
  }


  //Devuelve un array de juegos con su slug, nombre y una imagen
  mostrarJuegosEstrenados(){
    this.releasedGameService.juegosEstrenadosUltimaSemana().subscribe
    ((result: SearchGame) => {
      const games: Result[] = result.results;
      this.juegosEstrenados = games.slice(0,8);
    });
    

  }
}
  
