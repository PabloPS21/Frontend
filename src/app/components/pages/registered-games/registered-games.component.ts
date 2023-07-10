import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisteredGame } from 'src/app/models/registeredGame';
import { RegisterGamesService } from 'src/app/services/register-games.service';

@Component({
  selector: 'app-registered-games',
  templateUrl: './registered-games.component.html',
  styleUrls: ['./registered-games.component.css']
})
export class RegisteredGamesComponent implements OnInit {

  estado: string = "";
  titulo: string = "";
  games: RegisteredGame[] = [];

  constructor(
    private route: ActivatedRoute,
    private registerGamesService: RegisterGamesService
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.estado = params['status'];
      this.obtenerJuegos();
      this.changeTitle(this.estado);
    })
  
  }

  changeTitle(estado: string): void {
    switch(estado) {
      case "Pendiente": this.titulo = 'Pendientes' ; break
      case "Jugando" : this.titulo = 'Jugando' ; break
      case "Finalizado": this.titulo = 'Finalizados'
    }
   }

  obtenerJuegos(): void {
    this.registerGamesService.obtenerJuegosUsuario().
      subscribe((response: RegisteredGame[]) => {
        this.games = response.filter((juego: RegisteredGame) => juego.estado === this.estado)
    })
  }
}
