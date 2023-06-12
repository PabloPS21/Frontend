import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  logUsuario(username: string, contraseña: string): Observable<any> {
    const url = `${this.apiUrl}/usuarios/login`;
    const body = { username, contraseña };
    return this.http.post<any>(url, body);
  }
}
