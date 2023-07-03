import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Platform, Genre } from 'src/app/models/searchGame';
import { ObtainGameDetailsService } from 'src/app/services/obtain-game-details.service';
import { Developer, GameById } from 'src/app/models/gameById';
import { RegisterGamesService } from 'src/app/services/register-games.service';
import { RegisteredGame } from 'src/app/models/registeredGame';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccesDialogComponent } from 'src/app/shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
  providers: [DatePipe]
})
export class GameDetailsComponent implements OnInit {
  
  id: number = 0;
  juego: GameById | undefined;

  plataformas: string[] = [];
  generos: Genre[] = [];
  fechaSalida: string = "";
  descripcion: string = "";
  desarrolladores: Developer[] = [];

  registeredGame: RegisteredGame | undefined

  constructor(
    private route: ActivatedRoute,
    private gameDetaisService: ObtainGameDetailsService,
    private datePipe: DatePipe,
    private registrarJuegoService: RegisterGamesService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id= params['id']; 
      if (this.id) {
        this.gameDetaisService.getGameDetailsBySlug(this.id)
          .subscribe((result: GameById) => {
            this.juego = result;


            // Obtener las plataformas
            this.plataformas = this.juego?.platforms.map((platform: Platform) => platform.platform.name) || [];
            
            // Obtener los géneros
            this.generos = this.juego?.genres.map((genre: Genre) => genre) || [];
            
            // Obtener la fecha de salida y formatearla con el patrón 'dd-MM-yyyy'
            const fechaSalidaRaw = this.juego?.released;
            if (fechaSalidaRaw) {
              const fechaSalidaFormatted = this.datePipe.transform(fechaSalidaRaw, 'dd-MM-yyyy');
              this.fechaSalida = fechaSalidaFormatted || '';
            }

            //Obtener la descripción del juego
            this.descripcion = this.quitarHTML(this.juego?.description)

            //Obtener los desarrolladores
            this.desarrolladores = this.juego?.developers.map((developer: Developer) => developer) || [];

          });
      }
    });
  }

  //Método para eliminar las etiquetas html de la descripción
  quitarHTML(texto: string): string {
    var html = texto;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";
    return text;
  }

  registrar(estado:string) {
    const nombre = this.juego!.name;
    const est = estado;
    const urlImage = this.juego!.background_image

    //Registrar juegos
    this.registrarJuegoService.registrarJuego(nombre, est, urlImage).
      subscribe((response) => {
        this.registeredGame = response;
        this.abrirDialogo();
      })

    //Obtener juegos
    this.registrarJuegoService.obtenerJuegosUsuario().
      subscribe((response) => {
      })
  }

  abrirDialogo(): MatDialogRef<any> {
    return this.dialog.open(SuccesDialogComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: false,
      data: { texto: "Has añadido el juego con exito" } // Pasar el texto como datos al diálogo
    });
  }
}
