import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { SearchGame } from '../models/searchGame';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  private baseUrl = 'https://api.rawg.io/api';
  private apiKey = environment.gameApi_key;

  constructor(private http: HttpClient) { }

  searchGames(name: string): Observable<SearchGame> {
    let url = `${this.baseUrl}/games?key=${this.apiKey}&search=${name}&search_exact`;
    return this.http.get<SearchGame>(url);
  }
}
