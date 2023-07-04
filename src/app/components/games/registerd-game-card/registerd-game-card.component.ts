import { Component, Input } from '@angular/core';
import { RegisteredGame } from 'src/app/models/registeredGame';

@Component({
  selector: 'app-registerd-game-card',
  templateUrl: './registerd-game-card.component.html',
  styleUrls: ['./registerd-game-card.component.css']
})
export class RegisterdGameCardComponent {

  @Input() juego!: RegisteredGame;
  
}
