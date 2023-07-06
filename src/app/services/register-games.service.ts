import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisteredGame } from '../models/registeredGame';
import { TokenService } from './token.service';
import { EditGame } from '../models/editGame';

@Injectable({
  providedIn: 'root'
})
export class RegisterGamesService {

  private registerGamesApi = "http://localhost:8000/api/games/"

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }

    
  registrarJuego(nombre: string, estado: string, urlImage: string): Observable<RegisteredGame> {

    const idUsuario = this.tokenService.getIdUsuarioFromToken();

    if (idUsuario) {
      const datosJuego = { id_usuario: idUsuario, nombre: nombre, estado: estado, urlImage: urlImage };
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
      return this.http.post<RegisteredGame>(this.registerGamesApi, datosJuego, { headers });
    }

    throw new Error('No se pudo registrar el juego.');
  }



  obtenerJuegosUsuario(): Observable<RegisteredGame[]> {

    const idUsuario = this.tokenService.getIdUsuarioFromToken();

    if(idUsuario) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
      return this.http.get<RegisteredGame[]>('http://localhost:8000/api/usuarios/' + idUsuario + '/games', { headers });
    }

    throw new Error('No se puedieron obtener los juegos');

  }

  eliminarJuego(id: number): Observable<any> {
    const url = `http://localhost:8000/api/games/${id}`;
    return this.http.delete(url);
  }

  editarJuego(id: number, game: EditGame) {
    const url = `http://localhost:8000/api/games/${id}`;
    return this.http.put(url, game)
  }

}
