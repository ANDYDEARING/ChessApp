import { Piece } from './Piece';

export class ChessBoard {
    private board2DArray: Piece[][];
    constructor(){
        this.board2DArray = [];
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
            if(capturedPiece){
                capturedPiece.location = null;
            }
            piece.location = coord;
        } else {
            throw new TypeError("Invalid location format: " + coord);
        }
    }
}