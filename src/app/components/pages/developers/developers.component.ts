import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DeveloperModel, DeveloperResult } from 'src/app/models/developer';
import { DevelopersService } from 'src/app/services/developers.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit{

  developerResult: DeveloperResult[] = [];

  numPages: number = 0;
  page: number = 1;

  loading: boolean = true;

  constructor(
    private developersService: DevelopersService
  ) {}

  ngOnInit(): void {
    this.obtenerDevelopers();
  }

  obtenerDevelopers(): void {

    this.page = 1;

    this.developersService.getDevelopersByPage(this.page).subscribe((result: DeveloperModel) => {
      const developers: DeveloperResult[] = result.results;
      this.numPages = 5;
      
      this.developerResult = developers;

      const requests = [];
        for (let i = 2; i <= this.numPages; i++) {
          requests.push(this.developersService.getDevelopersByPage(i));
        }

        forkJoin(requests).subscribe((results: DeveloperModel[]) => {
          const additionalDevelopers: DeveloperResult[] = results.flatMap((result: DeveloperModel) => result.results)
          this.developerResult.push(...additionalDevelopers);
          console.log(this.developerResult)
          this.loading = false;
        })

    })

  }
}
