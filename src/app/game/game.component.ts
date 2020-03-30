import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_INITIALIZER, Router } from '@angular/router';
import { ChessBoard } from '../models/ChessBoard';
import { Piece } from '../models/Piece';
import { GameService } from './game.service';
import { GameStub } from '../models/GameStub';

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
  gameStub:GameStub;
  isPlayerTurn:boolean;
  isPlayerTurnOnLoad:boolean;
  canSubmitCheckmate:boolean;

  constructor(private gameService: GameService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => this.gameId = param['id']);
    this.gameService.getGame(this.gameId).subscribe(
      (response) => {
        this.gameStub = response;
        this.initializePieces();
        this.initializeUI();
        this.board.display();
      },
      (error) => {
        console.log(error);
      });
  }

  initializePieces(){
    for(let i=0;i<this.gameStub.piecesList.length;i++){
      if(this.gameStub.piecesList[i][2] != null){
        this.board.addPiece(new Piece(
            this.gameStub.piecesList[i][0],
            this.gameStub.piecesList[i][1],
            [parseInt(this.gameStub.piecesList[i][2]),
              parseInt(this.gameStub.piecesList[i][3])],
            this.board
          ));
      } else {
        this.board.addPiece(new Piece(
          this.gameStub.piecesList[i][0],
          this.gameStub.piecesList[i][1],
          null,
          this.board
        ));
      }
    }
    this.isWhiteTurn = this.gameStub.isWhiteTurn;
    let currentUser:string;
    if(this.isWhiteTurn){
      currentUser = "WHITE";
    } else {
      currentUser = "BLACK";
    }
    if(this.gameStub.winner!=null){
      let loser:string;
      if(this.gameStub.whiteUser == this.gameStub.winner){
        loser = "BLACK";
      } else {
        loser = "WHITE";
      }
      this.board.checkedKingSpace = this.board.getElementForPiece(
        this.board.findKing(loser));
    } else if(this.board.checkForCheck(this.board.getOpponent(currentUser))){
      this.board.checkedKingSpace = this.board.getElementForPiece(
        this.board.findKing(currentUser));
      this.board.check = true;
    }
  }

  initializeUI(){
    let sessionUser:string = sessionStorage.getItem("username");
    if(this.gameStub.whiteUser==sessionUser && this.gameStub.isWhiteTurn){
      this.isPlayerTurn = true;
    } else if(this.gameStub.blackUser==sessionUser && !this.gameStub.isWhiteTurn){
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
    this.isPlayerTurnOnLoad = this.isPlayerTurn;
  }

  onSubmit(){
    let stringableList = [];
    for(let i=0;i<this.board.pieceList.length;i++){
      let stringablePiece = [];
      stringablePiece[0]=this.board.pieceList[i].owner;
      stringablePiece[1]=this.board.pieceList[i].name;
      if(this.board.pieceList[i].location){
        stringablePiece[2]=this.board.pieceList[i].location[0].toString();
        stringablePiece[3]=this.board.pieceList[i].location[1].toString();
      } else {
        stringablePiece[2]=null;
        stringablePiece[3]=null;
      }
      stringableList[i]=stringablePiece;
    }
    this.gameStub.piecesList = stringableList;
    if(this.board.winner){
      if(this.board.winner == "WHITE"){
        this.gameStub.winner = this.gameStub.whiteUser;
      } else if (this.board.winner == "BLACK"){
        this.gameStub.winner = this.gameStub.blackUser;
      } else if (this.board.winner == "DRAW"){
        this.gameStub.winner = "STALEMATE";
      }
    }
    this.gameService.submitMove(this.gameStub).subscribe(
      (response) => {
        if(response){
          this.router.navigate(['home']);
        } else {
          this.onUndo();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUndo(){
    location.reload();
  }

  onConcede(){
    let opponent:string;
    if(sessionStorage.getItem("username")==this.gameStub.whiteUser){
      opponent = this.gameStub.blackUser;
    } else {
      opponent = this.gameStub.whiteUser;
    }
    this.gameStub.winner = opponent;
    this.gameService.submitMove(this.gameStub).subscribe(
      (response) => {
        if(response){
          this.router.navigate(['home']);
        } else {
          this.onUndo();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClick($event){
    let clickedSpace = $event.toElement;
    let clickedCoord = [parseInt(clickedSpace.id[0]),parseInt(clickedSpace.id[1])];
    if(clickedSpace.classList.contains("border-green")){
      let coord = [parseInt(clickedSpace.id[0]),parseInt(clickedSpace.id[1])];
      this.board.movePiece(this.getPiece(this.selectedSpace),coord);
      this.board.display();
      this.isWhiteTurn = !this.isWhiteTurn;
      this.isPlayerTurn = false;
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
    this.canSubmitCheckmate = this.board.checkmatePending;
  }
  isPiecesTurn(piece:Piece){
    return this.isPlayerTurn && this.isWhiteTurn == (piece.owner == "WHITE");
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
