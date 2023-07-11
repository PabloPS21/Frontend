import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environment/environment';
import { NewsModel } from '../models/news';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey = environment.newsApi_key;

  
  constructor(private http: HttpClient) { }

  obtenerNoticiasRelacionadas(): Observable<NewsModel> {

    const today = new Date();
    const threeDaysAgo = new Date(today.setDate(today.getDate() - 3)).toISOString();


    const url = `https://newsapi.org/v2/everything?q=videogames&from=${threeDaysAgo}&language=en&apiKey=${this.apiKey}`;

    return this.http.get<NewsModel>(url);

  }
}
