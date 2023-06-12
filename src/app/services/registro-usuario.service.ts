import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  registrarUsuario(username: string, email: string, contraseña: string): Observable<any> {
    const url = `${this.apiUrl}/usuarios/`;
    const body = { username, email, contraseña };
    return this.http.post<any>(url, body);
  }


}
