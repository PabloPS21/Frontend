import { Component, Input } from '@angular/core';
import { DeveloperResult } from 'src/app/models/developer';

@Component({
  selector: 'app-developer-card',
  templateUrl: './developer-card.component.html',
  styleUrls: ['./developer-card.component.css']
})
export class DeveloperCardComponent {

  @Input() developer!: DeveloperResult;
  
}
