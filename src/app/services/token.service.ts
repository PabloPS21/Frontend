import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  //Servicio que se encarga de gestionar el token. Para algunas peticiones al back hace falta el id del usuario

  private readonly token = 'token';

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  getIdUsuarioFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.id;
    }
    return null;
  }
}
