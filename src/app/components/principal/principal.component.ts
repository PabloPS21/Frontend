import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { LogOutDialogComponent } from 'src/app/shared/log-out-dialog/log-out-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  opened = true;
  isMobile: boolean = false;


  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router,
    ) {


    //Código para hacer los cambios necesarios según la resolución
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (this.isMobile) {
          this.opened = false;
        } else {
          this.opened = true;
        }
      });
  }

  //Si no hay token, significa que estamos logeados, entonces redirigimos al login
  ngOnInit() {
    if (!localStorage.getItem('token')){
      this.router.navigate(['/login']);
    }
  }
  
  //Método para abrir y cerrar el menú lateral
  toggleSidenav() {
    this.opened = !this.opened; 
  }

  cerrarSesion(): void {
    this.abrirDialogo();
  }

  abrirDialogo(): MatDialogRef<any> {
    return this.dialog.open(LogOutDialogComponent, {
      width: '400px',
      disableClose: false,
      autoFocus: false
    });
  }

}
