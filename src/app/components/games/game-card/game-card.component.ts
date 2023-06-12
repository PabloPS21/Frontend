import { Component, Input } from '@angular/core';
import { CardGame } from 'src/app/models/cardGame';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  
  @Input() juego!: CardGame;
}
