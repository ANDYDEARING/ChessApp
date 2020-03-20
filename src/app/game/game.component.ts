import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChessBoard } from '../models/ChessBoard';
import { Piece } from '../models/Piece';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameId:string;
  board:ChessBoard = new ChessBoard();
  selectedSpace:Element;
  highlightedMoves:Element[];
  isWhiteTurn:boolean = true;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => this.gameId = param['id']);
    this.initializePieces();
    if(this.detectSafari()){
      this.adaptSymbolForSafari();
    }
    this.board.display();
  }
  detectSafari(){
    var ua = navigator.userAgent.toLowerCase(); 
    if (ua.indexOf('safari') != -1) { 
      if (ua.indexOf('chrome') > -1) {
        return false; // Chrome
      } else {
        return true; // Safari
      } 
    }
    return false;
  }

  adaptSymbolForSafari(){
    for(let i=0;i<this.board.pieceList.length;i++){
      if(this.board.pieceList[i].name == "PAWN"){
        this.board.pieceList[i].symbol = "p";
      }
    }
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
    for(let i=0; i<8; i++){
      this.board.addPiece(new Piece("white","pawn",[i,6], this.board));
      this.board.addPiece(new Piece("black","pawn",[i,1], this.board));
    }
    this.board.addPiece(new Piece("white","rook",[0,7], this.board));
    this.board.addPiece(new Piece("white","rook",[7,7], this.board));
    this.board.addPiece(new Piece("white","knight",[1,7], this.board));
    this.board.addPiece(new Piece("white","knight",[6,7], this.board));
    this.board.addPiece(new Piece("white","bishop",[2,7], this.board));
    this.board.addPiece(new Piece("white","bishop",[5,7], this.board));
    this.board.addPiece(new Piece("white","queen",[3,7], this.board));
    this.board.addPiece(new Piece("white","king",[4,7], this.board));

    this.board.addPiece(new Piece("black","rook",[0,0], this.board));
    this.board.addPiece(new Piece("black","rook",[7,0], this.board));
    this.board.addPiece(new Piece("black","knight",[1,0], this.board));
    this.board.addPiece(new Piece("black","knight",[6,0], this.board));
    this.board.addPiece(new Piece("black","bishop",[2,0], this.board));
    this.board.addPiece(new Piece("black","bishop",[5,0], this.board));
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
