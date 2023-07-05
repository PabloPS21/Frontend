import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisteredGame } from 'src/app/models/registeredGame';
import { RegisterGamesService } from 'src/app/services/register-games.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-registerd-game-card',
  templateUrl: './registerd-game-card.component.html',
  styleUrls: ['./registerd-game-card.component.css']
})
export class RegisterdGameCardComponent {

  @Input() juego!: RegisteredGame;

  constructor(
    private registerGamesService: RegisterGamesService,
    private dialog: MatDialog
  ) {}

  eliminarJuego(id: number): void {
    const dialogRef = this.abrirDialogo();

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registerGamesService.eliminarJuego(id).subscribe(
          () => {
            console.log("Juego eliminado con éxito");
            location.reload();
          }
        );
      }
    });
  }

  abrirDialogo(): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: false,
    });
  }
  
}
