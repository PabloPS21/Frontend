import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenreModel } from '../models/genres';
import { SearchGame } from '../models/searchGame';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private apiKey = environment.gameApi_key;
  private readonly baseUrl = 'https://api.rawg.io/api/genres';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<GenreModel> {

    const url = `${this.baseUrl}?key=${this.apiKey}`;
    return this.http.get<GenreModel>(url);

  }

  getGamesByGenreId(genreId: number, page: number): Observable<SearchGame> {

      const pageNumber = page;
      const url = `https://api.rawg.io/api/games?genres=${genreId}&key=${this.apiKey}&page=${pageNumber}&page_size=20`;
      return this.http.get<SearchGame>(url);
  }
}
