import { Component } from '@angular/core';
import { PieceDefinition } from './PieceDefinition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChessApp';
  definer = new PieceDefinition();

  onClick($event){
    let spaceElement: Element = $event.toElement;
    console.log(spaceElement.innerHTML);
    console.log(this.definer.getPieceName(spaceElement.innerHTML))
  }
}