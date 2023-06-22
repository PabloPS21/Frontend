import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { LogOutDialogComponent } from 'src/app/shared/log-out-dialog/log-out-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { Result, SearchGame } from 'src/app/models/searchGame';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  opened = true;
  isMobile: boolean = false;

  searchControl = new FormControl();
  searchResults: Result[] = [];
  inputValue: string = '';
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router,
    private searchService: SearchBarService
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

    this.searchControl.valueChanges
    .pipe(
      debounceTime(150),
      distinctUntilChanged()
    )
    .subscribe((searchValue: string) => {
      this.searchService.searchGames(searchValue).subscribe((resultados: SearchGame) => {
        this.searchResults = resultados.results.sort((a, b) => b.playtime - a.playtime);
        console.log(this.searchResults);
        this.inputValue = searchValue;
      });
    });
  }

  botonMenu(): void {
    this.searchResults = [];
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
