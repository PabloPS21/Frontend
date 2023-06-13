import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>' 
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar si hay un token guardado en el almacenamiento local
    const token = localStorage.getItem('token');

    
    if (token) {
      //Si tiene token siginifica que no tiene que logearse
      this.router.navigate(['/main/inicio']);

    } else {
      // Si no lo mandamos al login
      this.router.navigate(['/login']);
    }
  }
}
