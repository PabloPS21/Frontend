import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { LogOutDialogComponent } from 'src/app/shared/log-out-dialog/log-out-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { Result, SearchGame } from 'src/app/models/searchGame';
import { DOCUMENT } from '@angular/common';

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

  clickListener: Function | undefined;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router,
    private searchService: SearchBarService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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

    //Sirve para hacer peticiones cada 1 segundo al escribir en la barra de búsqueda
    this.searchControl.valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged()
    )
    .subscribe((searchValue: string) => {
      this.searchService.searchGames(searchValue).subscribe((resultados: SearchGame) => {
        //Ordendos por más jugados
        this.searchResults = resultados.results.sort((a, b) => b.playtime - a.playtime);
        this.searchService.searchResults = this.searchResults;
        this.inputValue = searchValue;
      });
    });

    //Código al pulsar la tecla enter
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        if(this.searchResults.length != 0){
          //Mandar a la pantalla de búsqueda con los resultados obtenidos
          const query: string = this.searchControl.value;
          this.router.navigate(['/main/search-results'], {
            queryParams: {
              query: query,
            }
          });
          this.searchResults = [];
        }
      }
    });

    this.clickListener = this.renderer.listen(this.document, 'click', (event) => {
      this.closeSearchResults();
    });
  }

  ngOnDestroy(): void {
    this.clickListener?.(); // Cancelar la suscripción al evento click
  }


  //Si pulso fuera de la lista la lista de resultados se vacia para que la lista desaparezca
  closeSearchResults(): void {
    this.searchResults = []; 
  }

  //Si pulso uno de los juegos de la lista de resultados, la lista se vacia para poder buscar otra vez
  botonMenu(): void {
    this.searchResults = [];
  }
  
  //Método para abrir y cerrar el menú lateral
  toggleSidenav() {
    this.opened = !this.opened; 
  }

   // Método para ocultar el menú lateral en dispositivos móviles
   hideMenu() {
    this.opened = false;
  }

  //Si está en resolución móbil, cuando pulse a algún elemento del menú se cierra el menú
  changeSection() {
    if(this.isMobile){
      this.opened = !this.opened;
    }
  }

  cerrarSesion(): void {
    this.abrirDialogo();
  }

  //Diálogo de cerrar sesión
  abrirDialogo(): MatDialogRef<any> {
    return this.dialog.open(LogOutDialogComponent, {
      width: '400px',
      disableClose: false,
      autoFocus: false
    });
  }

}
