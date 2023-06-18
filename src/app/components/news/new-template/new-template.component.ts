import { Component, Input } from '@angular/core';
import { Article } from 'src/app/models/news';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.css']
})
export class NewTemplateComponent {

  @Input() new!: Article;

}
