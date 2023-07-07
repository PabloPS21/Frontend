import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameById } from '../models/gameById';

@Injectable({
  providedIn: 'root'
})
export class ObtainGameDetailsService {

  private apiKey = environment.gameApi_key;
  private readonly baseUrl = 'https://api.rawg.io/api/games';

  constructor(private http: HttpClient) { }

  getGameDetailsBySlug(id:number): Observable<GameById> {

    const url = `${this.baseUrl}/${id}?key=${this.apiKey}`;
    return this.http.get<GameById>(url);
  }

  getGameScreenshots(id:number): Observable<any> {
    const url = `${this.baseUrl}/${id}/screenshots?key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
