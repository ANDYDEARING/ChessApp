import { Piece } from './Piece';

export class ChessBoard {
    board2DArray: Piece[][];
    pieceList : Piece[];
    enPassantCoord: number[];
    ineligibleToCastle: Piece[];
    constructor(){
        this.pieceList = [];
        this.board2DArray = [];
        this.ineligibleToCastle = [];
        for(let i=0;i<8;i++){
            this.board2DArray[i]=[];
            for(let j=0;j<8;j++){
                this.board2DArray[i][j] = null;
            }
        }
    }
    addPiece(piece:Piece){
        let xCoord = piece.location[0];
        let yCoord = piece.location[1];
        if(!this.board2DArray[xCoord][yCoord]){
            this.pieceList.push(piece);
            this.board2DArray[xCoord][yCoord] = piece;
        } else {
            throw new TypeError("Already a piece at: " + piece.location);
        }
        
    }
    getPieceAtLocation(coord:number[]):Piece{
        if(this.validateCoord(coord)){
            return this.board2DArray[coord[0]][coord[1]];
        } else {
            throw new TypeError("Invalid location format: " + coord);
        }
    }
    validateCoord(coord:number[]){
        return(coord.length==2 && 0<=coord[0] 
            && coord[0]<=7 && 0<=coord[1] && coord[1]<=7);
    }
    movePiece(piece:Piece, coord:number[]){
        if(this.validateCoord(coord)){

            let capturedPiece = this.getPieceAtLocation(coord);
            if(piece.name == "PAWN" && (this.enPassantCoord) &&
            (coord[0] == this.enPassantCoord[0] && coord[1] == this.enPassantCoord[1])){
                if (piece.owner == "WHITE"){
                    capturedPiece = this.getPieceAtLocation([coord[0],coord[1]+1]);
                } else {
                    capturedPiece = this.getPieceAtLocation([coord[0],coord[1]-1]);
                }
            }
            if(capturedPiece){
                let capturedCoordString = 
                  capturedPiece.location[0].toString()+ capturedPiece.location[1].toString();
                document.getElementById(capturedCoordString).innerText = "";
                this.board2DArray[capturedPiece.location[0]][capturedPiece.location[1]] = null;
                capturedPiece.location = null;
            }


            let coordString = piece.location[0].toString()+piece.location[1].toString();
            document.getElementById(coordString).innerText = "";
            this.board2DArray[piece.location[0]][piece.location[1]] = null;
            this.board2DArray[coord[0]][coord[1]] = piece;

            if(piece.name == "PAWN" && (Math.abs(piece.location[1]-coord[1])==2) ){
                if(coord[1]==4){
                    this.enPassantCoord = [coord[0],5];
                } else {
                    this.enPassantCoord = [coord[0],2];
                }
            } else {
                this.enPassantCoord = null;
            }
            if(piece.name == "ROOK" || piece.name == "KING"){
                this.ineligibleToCastle.push(piece);
            }
            let castle:boolean = false;
            if(piece.name == "KING" && Math.abs(piece.location[0]-coord[0])==2){
                castle = true;
            }

            piece.location = coord;

            if(castle){
                if(coord[0]==6){
                    this.movePiece(this.getPieceAtLocation( [7,coord[1]] ), [5,coord[1]] );
                } else {
                    this.movePiece(this.getPieceAtLocation( [0,coord[1]] ), [3,coord[1]] );
                }
            }
            
            if(piece.name == "PAWN" && 
            ((coord[1]==0 && piece.owner == "WHITE") || (coord[1]==7 && piece.owner == "BLACK") )){
                piece.name = "QUEEN";
                piece.symbol = piece.getSymbol();
            }
            
            this.display();
        } else {
            throw new TypeError("Invalid location format: " + coord);
        }
    }
    display(){
        for(let index=0;index<this.pieceList.length;index++){
            let piece = this.pieceList[index];
            if (piece.location){
                let coordString = piece.location[0].toString()+piece.location[1].toString();
                document.getElementById(coordString).innerText = piece.symbol;
            }
        }
    }
    canCastle(king:Piece):Piece[]{
        if(king.name == "KING" && !this.ineligibleToCastle.includes(king)){
            let resultList = [];
            for(let i=0;i<this.pieceList.length;i++){
                let testPiece = this.pieceList[i];
                if(testPiece.name=="ROOK" 
                && testPiece.owner == king.owner 
                && testPiece.location 
                && !this.ineligibleToCastle.includes(testPiece)){
                    resultList.push(testPiece);
                }
            }
            if(resultList.length > 0){
                return resultList;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}