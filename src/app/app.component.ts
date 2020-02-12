import { Component } from '@angular/core';
import { Piece } from './Piece';
import { ChessBoard } from './ChessBoard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChessApp';
  board:ChessBoard = new ChessBoard();
  selectedSpace:Element;
  highlightedMoves:Element[];
  isWhiteTurn:boolean = true;

  ngOnInit(){
    this.initializePieces();
    this.board.display();
  }

  onClick($event){
    let clickedSpace = $event.toElement;
    let clickedCoord = [parseInt(clickedSpace.id[0]),parseInt(clickedSpace.id[1])];
    
    if(clickedSpace.classList.contains("border-green")){
      let coord = [parseInt(clickedSpace.id[0]),parseInt(clickedSpace.id[1])];
      this.board.movePiece(this.getPiece(this.selectedSpace),coord);
      this.board.display();
      this.isWhiteTurn = !this.isWhiteTurn;
      this.clearGreenBorder();
      this.selectedSpace.classList.remove("border-blue");
    } else if(this.board.getPieceAtLocation(clickedCoord) 
    && this.isPiecesTurn(this.board.getPieceAtLocation(clickedCoord))){
      if(this.selectedSpace){
        this.selectedSpace.classList.remove("border-blue");
      }
      this.selectedSpace = $event.toElement;
      this.selectedSpace.classList.add("border-blue");
      this.highlightMoves(this.convertToElements(
        this.getPiece(this.selectedSpace).getMoves()));
    } else {
      this.clearGreenBorder();
      if(this.selectedSpace){
        this.selectedSpace.classList.remove("border-blue");
      }
    }

  }
  isPiecesTurn(piece:Piece){
    return this.isWhiteTurn == (piece.owner == "WHITE");
  }
  convertToElements(coordList:number[][]):Element[]{
    let results : Element[] = [];
    if(coordList){
      for(let i=0;i<coordList.length;i++){
        results.push(document.getElementById(
          coordList[i][0].toString()+coordList[i][1].toString()));
      }
    }
    return results;
  }

  initializePieces(){
    // for(let i=0; i<8; i++){
    //   this.board.addPiece(new Piece("white","pawn",[i,6], this.board));
    //   this.board.addPiece(new Piece("black","pawn",[i,1], this.board));
    // }
    this.board.addPiece(new Piece("white","rook",[0,7], this.board));
    this.board.addPiece(new Piece("white","rook",[7,7], this.board));
    // this.board.addPiece(new Piece("white","knight",[1,7], this.board));
    // this.board.addPiece(new Piece("white","knight",[6,7], this.board));
    // this.board.addPiece(new Piece("white","bishop",[2,7], this.board));
    // this.board.addPiece(new Piece("white","bishop",[5,7], this.board));
    this.board.addPiece(new Piece("white","queen",[3,7], this.board));
    this.board.addPiece(new Piece("white","king",[4,7], this.board));

    this.board.addPiece(new Piece("black","rook",[0,0], this.board));
    this.board.addPiece(new Piece("black","rook",[7,0], this.board));
    // this.board.addPiece(new Piece("black","knight",[1,0], this.board));
    // this.board.addPiece(new Piece("black","knight",[6,0], this.board));
    // this.board.addPiece(new Piece("black","bishop",[2,0], this.board));
    // this.board.addPiece(new Piece("black","bishop",[5,0], this.board));
    this.board.addPiece(new Piece("black","queen",[3,0], this.board));
    this.board.addPiece(new Piece("black","king",[4,0], this.board));
  }

  getPiece(space:Element):Piece{
    let xCoord = parseInt(space.id[0]);
    let yCoord = parseInt(space.id[1]);
    return this.board.getPieceAtLocation([xCoord,yCoord]);
  }

  highlightMoves(moveList:Element[]){
    if(this.highlightedMoves){
      this.clearGreenBorder();
    }
    for(let i=0;i<moveList.length;i++){
      moveList[i].classList.add("border-green");
    }
    this.highlightedMoves = moveList;
  }
  clearGreenBorder(){
    if(this.highlightedMoves){
      for(let i=0;i<this.highlightedMoves.length;i++){
        this.highlightedMoves[i].classList.remove("border-green");
      }
    }
  }
}