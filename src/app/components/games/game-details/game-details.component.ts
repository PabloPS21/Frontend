import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Platform, Genre, Result } from 'src/app/models/searchGame';
import { ObtainGameDetailsService } from 'src/app/services/obtain-game-details.service';
import { Developer, GameById } from 'src/app/models/gameById';
import { RegisterGamesService } from 'src/app/services/register-games.service';
import { RegisteredGame } from 'src/app/models/registeredGame';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccesDialogComponent } from 'src/app/shared/succes-dialog/succes-dialog.component';
import { Screenshots } from 'src/app/models/screenshot';
import { ImageDialogComponent } from 'src/app/shared/image-dialog/image-dialog.component';

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
  screenshots: Screenshots[] = [];
  relatedGames: Result[] = [];

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

          //Obtener screenshots
          this.gameDetaisService.getGameScreenshots(this.id).
            subscribe((result: any) => {
              this.screenshots = result.results;
              console.log(this.screenshots);
            })
          }

          //Obtener juegos relacionados
          this.gameDetaisService.getRelatedGames(this.id).subscribe((result) => {
            this.relatedGames = result.results;
            console.log(this.relatedGames);
          });

          const element = document.getElementById('top');
          if (element) {
            element.scrollIntoView({ behavior: 'auto' });
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
        this.abrirDialogoSucces();
      },
      (error) => {
        this.abrirDialogoError();
      }
      );

  }

  abrirDialogoSucces(): MatDialogRef<any> {
    return this.dialog.open(SuccesDialogComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: false,
      data: { texto: "You have added the game successfully" } // Pasar el texto como datos al diálogo
    });
  }

  abrirDialogoError(): MatDialogRef<any> {
    return this.dialog.open(SuccesDialogComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: false,
      data: { texto: "The game is already in your lists" } // Pasar el texto como datos al diálogo
    });
  }


  //Abrir screenshot en un modal
  openImage(imageUrl: string): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: { imageUrl },
    });

  }
}
