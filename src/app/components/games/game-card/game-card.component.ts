import { Component, Input, OnInit} from '@angular/core';
import { ReducedResult } from 'src/app/models/reducedResult';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent{
  
  @Input() juego!: ReducedResult;

}
