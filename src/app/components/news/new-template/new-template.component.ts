import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/news';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.css']
})
export class NewTemplateComponent implements OnInit {

  @Input() new!: Article;

  cleanDescription!: string;

  ngOnInit() {
    this.cleanDescription = this.new.content.replace(/\[([^[]+)\]$/, '');
  }
 


}
