import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';

import { ReleasedGamesService } from 'src/app/services/released-games.service';
import { SearchGame } from 'src/app/models/searchGame';
import { Result } from 'src/app/models/searchGame';
import { CardGame } from 'src/app/models/cardGame';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private releasedGameService: ReleasedGamesService) {}

  juegosEstrenados: CardGame[] = [];

  ngOnInit() {
    this.mostrarJuegosEstrenados();
  }


  //Devuelve un array de juegos con su slug, nombre y una imagen
  mostrarJuegosEstrenados(){
    this.releasedGameService.juegosEstrenadosUltimaSemana().subscribe
    ((result: SearchGame) => {
      const games: Result[] = result.results;
      
      this.juegosEstrenados = games.map((game: Result) => {
        return {
          slug: game.slug,
          name: game.name,
          image: game.background_image
        }
      }).slice(0,8);

    });
    

  }
}
  
