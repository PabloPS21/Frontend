import { Component, OnInit } from '@angular/core';

import { ReleasedGamesService } from 'src/app/services/released-games.service';
import { SearchGame } from 'src/app/models/searchGame';
import { Result } from 'src/app/models/searchGame';
import { ReducedResult } from 'src/app/models/reducedResult';
import { NewsModel } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/models/news';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private releasedGameService: ReleasedGamesService,
    private newsService: NewsService) {}

  juegosEstrenados: ReducedResult[] = [];
  noticiasRelacionadas: Article[] = [];

  loading: boolean = true;

  ngOnInit() {
    this.mostrarJuegosEstrenados();
    this.mostrarNoticiasRelacionadas();
  }


  //Devuelve un array de juegos con su slug, nombre y una imagen
  mostrarJuegosEstrenados(){
    this.loading = true;
    this.releasedGameService.juegosEstrenadosUltimaSemana(1).subscribe
    ((result: SearchGame) => {
      const games: Result[] = result.results;
      this.juegosEstrenados = games.slice(0,8);
      this.loading = false;
    });
    
  }

  mostrarNoticiasRelacionadas() {
    this.newsService.obtenerNoticiasRelacionadas().subscribe
    ((result: NewsModel) => {
      const news: Article[] = result.articles;
      const randomNews = this.shuffleArray(news).slice(0, 5);
      this.noticiasRelacionadas = randomNews;
    })
  }

  shuffleArray(array: any[]) {
    // Implementación del algoritmo de Fisher-Yates para mezclar el array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
  
