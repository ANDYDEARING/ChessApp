import { Component } from '@angular/core';
import { Piece } from './Piece';
import { CharTools } from './CharTools';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChessApp';
  whitePieces:Piece[] = new Array();
  blackPieces:Piece[] = new Array();
  selectedSpace:Element;
  highlightedMoves:string[];
  highlightedCaptures:string[];
  isWhiteTurn:boolean = true;

  ngOnInit(){
    this.initializePieces();
    this.displayPieces();
  }

  onClick($event){
    // console.log($event);
    if(this.selectedSpace){
      this.selectedSpace.classList.remove("border-blue");
    }
    if($event.toElement.innerHTML){
      this.selectedSpace = $event.toElement;
      this.selectedSpace.classList.add("border-blue");
      this.highlightMoves(this.getPiece(this.selectedSpace).getMoves());
    }
  }

  initializePieces(){
    let currChar = 'A';
    for(let i=0; i<8; i++){
      this.whitePieces.push(new Piece("white","pawn","2" + currChar));
      this.blackPieces.push(new Piece("black","pawn","7" + currChar));
      currChar = CharTools.nextChar(currChar);
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

  getPiece(space:Element){
    for(let i=0;i<this.whitePieces.length;i++){
      if(this.whitePieces[i].location==space.id){
        return this.whitePieces[i];
      }
    }
    for(let i=0;i<this.blackPieces.length;i++){
      if(this.blackPieces[i].location==space.id){
        return this.blackPieces[i];
      }
    }
    return null;
  }

  highlightMoves(moveList:string[]){
    if(this.getPiece(this.selectedSpace).name == "PAWN"){
      //moveList = this.checkPawnMoves(moveList);
    } else {
      //moveList = this.checkMoves(moveList);
    }
    if(this.highlightedMoves){
      for(let i=0;i<this.highlightedMoves.length;i++){
        document.getElementById(this.highlightedMoves[i]).classList.remove("border-green");
      }
    }
    if(this.highlightedCaptures){

    }
    for(let i=0;i<moveList.length;i++){
      document.getElementById(moveList[i]).classList.add("border-green");
    }
    this.highlightedMoves = moveList;
  }
}