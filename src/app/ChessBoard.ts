import { Piece } from './Piece';

export class ChessBoard {
    private board2DArray: Piece[][] = new Array();
    constructor(){
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                this.board2DArray[i][j] = null;
            }
        }
    }
    addPiece(piece:Piece){
        let xCoord = piece.location[1].charCodeAt(0) - ("A").charCodeAt(0);
        let yCoord = parseInt(piece.location[0])-1;
        if(!this.board2DArray[xCoord][yCoord]){
            this.board2DArray[xCoord][yCoord] = piece;
        } else {
            throw new TypeError("Already a piece at: " + piece.location);
        }
        
    }
    getPieceAtLocation(chessCoord:string):Piece{
        if(chessCoord.match('^[1-8][A-H]$')){
            let xCoord = chessCoord[1].charCodeAt(0) - ("A").charCodeAt(0);
            let yCoord = parseInt(chessCoord[0])-1;
            return this.board2DArray[xCoord][yCoord];
        } else {
            throw new TypeError("Invalid location format: " + chessCoord);
        }
    }
}