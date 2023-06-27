import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { Result } from 'src/app/models/searchGame';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchResults: Result[] = [];
  query: string = '';

  constructor(
    private searchService: SearchBarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.searchResults = this.searchService.searchResults;
      console.log(this.searchResults);
    });

  }

}