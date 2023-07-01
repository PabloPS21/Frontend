import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeveloperModel } from '../models/developer';
import { SearchGame } from '../models/searchGame';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  private apiKey = environment.gameApi_key;
  private readonly baseUrl = 'https://api.rawg.io/api/developers';

  constructor(private http: HttpClient) { }

  getDevelopersByPage(page:number): Observable<DeveloperModel> {

    const url = `${this.baseUrl}?key=${this.apiKey}&page=${page}&page_size=20`;
    return this.http.get<DeveloperModel>(url);

  }

  getGamesByDevelopersName(page: number, developer: string): Observable<SearchGame> {
    
    const pageNumber: number = page;
    
    const url = `https://api.rawg.io/api/games?developers=${developer}&key=${this.apiKey}&page=${pageNumber}&page_size=20`;
    return this.http.get<SearchGame>(url);
  }
}
