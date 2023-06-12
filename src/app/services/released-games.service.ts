import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SearchGame } from '../models/searchGame';
import { Result } from '../models/searchGame';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReleasedGamesService {

  private apiKey = environment.gameApi_key;

  constructor(private http: HttpClient) { }

  //TODO: paginación


  juegosEstrenadosUltimaSemana(): Observable<SearchGame> {
    const fechaActual = new Date();
    const fechaSemanaAtras = new Date(fechaActual.getTime() - 7 * 24 * 60 * 60 * 1000);

    const fechaActualFormato = this.formatDate(fechaActual);
    const fechaSemanaAtrasFormato = this.formatDate(fechaSemanaAtras);

    const url = `https://api.rawg.io/api/games?key=${this.apiKey}&dates=${fechaSemanaAtrasFormato},${fechaActualFormato}`;

    return this.http.get<SearchGame>(url);

  }

  juegosEstrenadosUltimoMes(): Observable<SearchGame> {
    const fechaActual = new Date();
    const fechaSemanaAtras = new Date(fechaActual.getTime() - 31 * 24 * 60 * 60 * 1000);

    const fechaActualFormato = this.formatDate(fechaActual);
    const fechaSemanaAtrasFormato = this.formatDate(fechaSemanaAtras);

    const url = `https://api.rawg.io/api/games?key=${this.apiKey}&dates=${fechaSemanaAtrasFormato},${fechaActualFormato}`;

    return this.http.get<SearchGame>(url);

  }

  juegosEstrenadosUltimosTresMeses(): Observable<SearchGame> {
    const fechaActual = new Date();
    const fechaSemanaAtras = new Date(fechaActual.getTime() - 31 * 3 * 24 * 60 * 60 * 1000);

    const fechaActualFormato = this.formatDate(fechaActual);
    const fechaSemanaAtrasFormato = this.formatDate(fechaSemanaAtras);

    const url = `https://api.rawg.io/api/games?key=${this.apiKey}&dates=${fechaSemanaAtrasFormato},${fechaActualFormato}`;

    return this.http.get<SearchGame>(url);

  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
