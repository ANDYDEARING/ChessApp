import { Component } from '@angular/core';
import { Piece } from './Piece';
import { CharTools } from './CharTools';
import { ChessBoard } from './ChessBoard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChessApp';
  board:ChessBoard = new ChessBoard();
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
      //this.highlightMoves(this.getPiece(this.selectedSpace).getMoves());
    }
  }

  initializePieces(){
    for(let i=0; i<8; i++){
      this.whitePieces.push(new Piece("white","pawn",[i,6], this.board));
      this.blackPieces.push(new Piece("black","pawn",[i,1], this.board));
    }
    this.whitePieces.push(new Piece("white","rook",[0,7], this.board));
    this.whitePieces.push(new Piece("white","rook",[7,7], this.board));
    this.whitePieces.push(new Piece("white","knight",[1,7], this.board));
    this.whitePieces.push(new Piece("white","knight",[6,7], this.board));
    this.whitePieces.push(new Piece("white","bishop",[2,7], this.board));
    this.whitePieces.push(new Piece("white","bishop",[5,7], this.board));
    this.whitePieces.push(new Piece("white","queen",[3,7], this.board));
    this.whitePieces.push(new Piece("white","king",[4,7], this.board));

    this.blackPieces.push(new Piece("black","rook",[0,0], this.board));
    this.blackPieces.push(new Piece("black","rook",[7,0], this.board));
    this.blackPieces.push(new Piece("black","knight",[1,0], this.board));
    this.blackPieces.push(new Piece("black","knight",[6,0], this.board));
    this.blackPieces.push(new Piece("black","bishop",[2,0], this.board));
    this.blackPieces.push(new Piece("black","bishop",[5,0], this.board));
    this.blackPieces.push(new Piece("black","queen",[3,0], this.board));
    this.blackPieces.push(new Piece("black","king",[4,0], this.board));
  }

  displayPieces(){
    for(let i=0;i<this.whitePieces.length;i++){
      this.whitePieces[i].display();
    }
    for(let i=0;i<this.blackPieces.length;i++){
      this.blackPieces[i].display();
    }
  }

  getPiece(space:Element):Piece{
    let xCoord = parseInt(space.id[0]);
    let yCoord = parseInt(space.id[1]);
    return this.board.getPieceAtLocation([xCoord,yCoord]);
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