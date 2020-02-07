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
    console.log($event);
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
    this.whitePieces.push(new Piece("white","rook","1A"));
    this.whitePieces.push(new Piece("white","rook","1H"));
    this.whitePieces.push(new Piece("white","knight","1B"));
    this.whitePieces.push(new Piece("white","knight","1G"));
    this.whitePieces.push(new Piece("white","bishop","1C"));
    this.whitePieces.push(new Piece("white","bishop","1F"));
    this.whitePieces.push(new Piece("white","queen","1D"));
    this.whitePieces.push(new Piece("white","king","1E"));

    this.blackPieces.push(new Piece("black","rook","8A"));
    this.blackPieces.push(new Piece("black","rook","8H"));
    this.blackPieces.push(new Piece("black","knight","8B"));
    this.blackPieces.push(new Piece("black","knight","8G"));
    this.blackPieces.push(new Piece("black","bishop","8C"));
    this.blackPieces.push(new Piece("black","bishop","8F"));
    this.blackPieces.push(new Piece("black","queen","8D"));
    this.blackPieces.push(new Piece("black","king","8E"));
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