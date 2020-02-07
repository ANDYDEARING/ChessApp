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
    //console.log($event);
    //console.log(spaceElement.innerHTML);
    //console.log(this.definer.getPieceName(spaceElement.innerHTML))
    //spaceElement.classList.add("border-red");
    let spaceElement: Element = $event.toElement;
  }
}