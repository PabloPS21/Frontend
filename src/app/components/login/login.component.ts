import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario';
import { LogInService } from 'src/app/services/log-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  hidePassword: boolean = true;

  error: string = '';
  
  user: Usuario | undefined;
  token: string = "";

  constructor
    (
    private router: Router,
    private logInService: LogInService
    ) {}

  ngOnInit() {

    //Creación redirección a la pantalla de registro
    const linkRegistro = document.querySelector('#linkRegistro');
    if (linkRegistro) {
      linkRegistro.addEventListener('click', this.redireccionRegistro.bind(this));
    }
  }
  

  //Redirección a la pantalla de registro
  redireccionRegistro(event: Event) {
    event.preventDefault(); // Evita la redirección predeterminada del enlace
    this.router.navigate(['/register']); // Redirige al componente de registro
  }

  //Cambia la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  validacionDatos(): boolean {

    // Validar que los campos no estén vacíos
    if (!this.username || !this.password) {
      this.error = 'Por favor, completa todos los campos.';
      return false;
    }

    return true;
  }

  logUsuario() {
    this.logInService.logUsuario(this.username, this.password).
      subscribe({
        next: response => {
          this.error = "";
          this.user = response.usuario;
          this.token = response.token;

          //Nos guardamos el token en el almacenamiento local
          localStorage.setItem('token', this.token);

          this.router.navigate(['/main/inicio']);
        },
        error: error => {
          // Mostrar el mensaje de error
          this.error = error.error.msg;
          console.log(this.error);
        }
      });
  }

  submitForm() {
    //Si los datos están bien introducidos ejecuta el método de logiUsuario
    if(this.validacionDatos()) {
      this.logUsuario();
    }
  }

}
