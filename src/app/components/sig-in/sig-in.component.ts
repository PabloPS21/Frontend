import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RegistroUsuarioService } from 'src/app/services/registro-usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccesDialogComponent } from 'src/app/shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})


export class SigInComponent {

  username: string = "";
  email: string = ""
  password: string = ""
  repeatPassword: string = "";

  hidePassword: boolean = true;
  hideRepeatPassword: boolean = true;

  error: string = "";

  usuarios: Usuario[] = [];

  constructor
    (
    private registroUsuarioService: RegistroUsuarioService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  //Cambiar visibilidad del campo de la contraseña al pulsar el icono del ojo
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  //Cambiar visibilidad del campo de repetir la contraseña al pulsar el icono del ojo
  toggleRepeatPasswordVisibility(): void {
    this.hideRepeatPassword = !this.hideRepeatPassword;
  }


  //Método que comprueba que los datos se ingresan con un formato correcto
  validacionDatos(): boolean {

    // Validar que los campos no estén vacíos
    if (!this.username || !this.email || !this.password || !this.repeatPassword) {
      this.error = 'Por favor, completa todos los campos.';
      return false;
    }

    // Validar el formato del email usando una expresión regular
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = "Por favor, ingresa un email válido.";
      return false;
    }

    // Validar la complejidad de la contraseña
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(this.password)) {
      this.error = "La contraseña debe tener al menos 8 caracteres y contener al menos una letra minúscula, una letra mayúscula y un número.";
      return false;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.repeatPassword) {
      this.error = "Las contraseñas no coinciden.";
      return false;
    }

    //Si todo se cumple devolvemos un true
    return true;
  }

  //Comprueba si existe un esuario con el nombre y correo introducidos, si no, hace el POST
  registrarUsuario() {
    this.registroUsuarioService.registrarUsuario(this.username, this.email, this.password)
      .subscribe({
        next: response => {

          this.error = "";
          //Mostrar mensaje de éxito y redirigir al login
          this.abrirDialogo().afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
          ;
        },
        error: error => {
          //Mostrar error
          this.error = error.error.message;
        }
      });
  }

  
  submitForm() {
    //Si los datos están bien introducidos ejecuta el método de registro
    if(this.validacionDatos()) {
      this.registrarUsuario();
    }
  }

  abrirDialogo(): MatDialogRef<any> {
    return this.dialog.open(SuccesDialogComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: false
    });
  }

}
