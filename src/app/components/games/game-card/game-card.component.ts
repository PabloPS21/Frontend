import { Component, Input, OnInit} from '@angular/core';
import { Result } from 'src/app/models/searchGame';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent{
  
  @Input() juego!: Result;

}
