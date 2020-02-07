import { Component } from '@angular/core';
import { PieceDefinition } from './PieceDefinition';
import { Piece } from './Piece';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChessApp';
  // definer = new PieceDefinition();
  whitePieces:Piece[] = new Array();
  blackPieces:Piece[] = new Array();

  ngOnInit(){
    this.initializePieces();
    this.displayPieces();
  }

  onClick($event){
    //console.log($event);
    //console.log(spaceElement.innerHTML);
    //console.log(this.definer.getPieceName(spaceElement.innerHTML))
    //spaceElement.classList.add("border-red");
    let spaceElement: Element = $event.toElement;
  }

  initializePieces(){
    let currChar = 'A';
    for(let i=0; i<8; i++){
      this.whitePieces.push(new Piece("white","pawn","2" + currChar));
      this.blackPieces.push(new Piece("black","pawn","7" + currChar));
      currChar = nextChar(currChar);
    }
  }
  displayPieces(){
    for(let i=0;i<this.whitePieces.length;i++){
      this.whitePieces[i].display();
    }
    for(let i=0;i<this.blackPieces.length;i++){
      this.blackPieces[i].display();
    }
  }
}
function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}