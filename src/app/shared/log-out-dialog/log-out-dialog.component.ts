import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out-dialog',
  templateUrl: './log-out-dialog.component.html',
  styleUrls: ['./log-out-dialog.component.css']
})
export class LogOutDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LogOutDialogComponent>,
    private router: Router
    ) {}

  //Si apretamos el botón de volver simplemente cerramos el dialog
  cancelar() {
    this.dialogRef.close();
  }

  //Si cerramos sesión borramos el token y redirigimos al login
  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

}
