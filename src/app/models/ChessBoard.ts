import { Piece } from './Piece';

export class ChessBoard {
    board2DArray: Piece[][];
    pieceList : Piece[];
    enPassantCoord: number[];
    ineligibleToCastle: Piece[];
    check:boolean;
    checkedKingSpace:Element;
    constructor(){
        this.check = false;
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
        if(piece.location){
            let xCoord = piece.location[0];
            let yCoord = piece.location[1];
            if(!this.board2DArray[xCoord][yCoord]){
                this.pieceList.push(piece);
                this.board2DArray[xCoord][yCoord] = piece;
            } else {
                throw new TypeError("Already a piece at: " + piece.location);
            }
        } else {
            this.pieceList.push(piece);
        }
        
    }
    getPieceAtLocation(coord:number[]):Piece{
        if(this.validateCoord(coord)){
            return this.board2DArray[coord[0]][coord[1]];
        } else {
            throw new TypeError("Invalid location format: " + coord);
        }
    }
    getElementForPiece(piece:Piece):Element{
        if(piece.location){
            return document.getElementById(piece.location[0].toString()+ piece.location[1].toString());
        } else {
            return null;
        }
    }
    validateCoord(coord:number[]){
        return(coord.length==2 && 0<=coord[0] 
            && coord[0]<=7 && 0<=coord[1] && coord[1]<=7);
    }
    movePiece(piece:Piece, coord:number[], test:boolean=false){
        // if(!piece){
        //     debugger;
        // }
        if(this.validateCoord(coord)){

            let capturedPiece = this.getPieceAtLocation(coord);

            //check for enPassant capture
            if(piece.name == "PAWN" && (this.enPassantCoord) &&
            (coord[0] == this.enPassantCoord[0] && coord[1] == this.enPassantCoord[1])){
                if (piece.owner == "WHITE"){
                    capturedPiece = this.getPieceAtLocation([coord[0],coord[1]+1]);
                } else {
                    capturedPiece = this.getPieceAtLocation([coord[0],coord[1]-1]);
                }
            }

            //remove the captured piece from the page and the board data, then change its location to null
            if(capturedPiece){
                this.board2DArray[capturedPiece.location[0]][capturedPiece.location[1]] = null;
                capturedPiece.location = null;
            }

            //move the piece's position in the array
            //keep the piece's old location in Piece.location for comparison (for now)
            this.board2DArray[piece.location[0]][piece.location[1]] = null;
            this.board2DArray[coord[0]][coord[1]] = piece;

            //if the piece is a pawn and it moved 2 spaces, leave a marker for en passant
            if(piece.name == "PAWN" && (Math.abs(piece.location[1]-coord[1])==2) ){
                if(coord[1]==4){
                    this.enPassantCoord = [coord[0],5];
                } else {
                    this.enPassantCoord = [coord[0],2];
                }

            //clear out old en passant coord because the opponent only has one move to react
            } else {
                this.enPassantCoord = null;
            }

            //if a piece moves, it can't be used in a castle
            if(piece.name == "ROOK" || piece.name == "KING"){
                this.ineligibleToCastle.push(piece);
            }

            //clear out the old value and check to see if the king moved 2 (castle)
            let castle:boolean = false;
            if(piece.name == "KING" && Math.abs(piece.location[0]-coord[0])==2){
                castle = true;
            }

            //update the piece.location now
            piece.location = coord;

            //if castle, "flip" the rook to the other side
            if(castle){
                if(coord[0]==6){
                    this.movePiece(this.getPieceAtLocation( [7,coord[1]] ), [5,coord[1]] );
                } else {
                    this.movePiece(this.getPieceAtLocation( [0,coord[1]] ), [3,coord[1]] );
                }
            }

            //if a pawn reached the other side, make it a queen
            if(piece.name == "PAWN" && 
            ((coord[1]==0 && piece.owner == "WHITE") || (coord[1]==7 && piece.owner == "BLACK") )){
                piece.name = "QUEEN";
                piece.symbol = piece.getSymbol();
            }

            //clear previous checked king space (if any) and check for check
            if(this.checkedKingSpace){
                this.checkedKingSpace = null;
            }
            this.check = this.checkForCheck(piece.owner);
            //only check for endstate on test=false
            if(this.check && !test){
                if(this.checkForCheckmate(piece.owner)){
                    let winner = piece.owner.toLowerCase();
                    winner = winner.charAt(0).toUpperCase() + winner.substring(1);
                    this.endGame("Checkmate. " + winner + " is the winner.");
                }
                this.checkedKingSpace = this.getElementForPiece(this.findKing(this.getOpponent(piece.owner)));
                this.checkedKingSpace.classList.add("red");
            } else if(!test){
                if(this.checkForStalemate(this.getOpponent(piece.owner))){
                    this.endGame("Stalemate. The game is a draw.");
                }
            }
        } else {
            throw new TypeError("Invalid location format: " + coord);
        }
    }
    getOpponent(side:string):string{
        if(side == "WHITE"){
            return "BLACK";
        } else {
            return "WHITE";
        }
    }
    display(){
        for(let x=0;x<=7;x++){
            for(let y=0;y<=7;y++){
                let element = document.getElementById(x.toString()+y.toString());
                element.innerText = "";
                element.classList.remove("red");
                element.classList.remove("white-piece");
            }
        }

        if(this.checkedKingSpace){
            this.checkedKingSpace.classList.add("red");
        }

        for(let index=0;index<this.pieceList.length;index++){
            let piece = this.pieceList[index];
            if (piece.location){
                let coordString = piece.location[0].toString()+piece.location[1].toString();
                document.getElementById(coordString).innerText = piece.symbol;
                if(piece.owner=="WHITE"){
                    document.getElementById(coordString).classList.add("white-piece");
                }
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
            }
        } 
        return null;
    }
    findKing(owner:string):Piece{
        for(let i=0;i<this.pieceList.length;i++){
            let testPiece = this.pieceList[i];
            if(testPiece.name == "KING" && testPiece.owner == owner){
                return testPiece;
            }
        }
    }
    checkForCheck(aggressor:string):boolean{
        //assume not in check until verified
        this.check = false;
        let defenderKing:Piece = this.findKing(this.getOpponent(aggressor));
        
        for(let i=0;i<this.pieceList.length;i++){
            let testPiece = this.pieceList[i];
            if(testPiece.owner == aggressor && testPiece.location){
                let threatenedSpaces = testPiece.getMoves(true);
                for(let j=0;j<threatenedSpaces.length;j++){
                    if(threatenedSpaces[j][0]==defenderKing.location[0]
                    && threatenedSpaces[j][1]==defenderKing.location[1]){
                        return true;
                    }
                }
            }
        }
        return false;
    }
    makeClone():ChessBoard{
        let cloneBoard = new ChessBoard();
        for(let i=0;i<this.pieceList.length;i++){
            if(this.pieceList[i].location){
                let clonePiece = this.pieceList[i].makeClone(cloneBoard);
                cloneBoard.addPiece(clonePiece);
            }
        }
        return cloneBoard;
    }
    checkForCheckmate(aggressor:string,test=false):boolean{
        let availableMoves:number = 0;
        for(let i=0;i<this.pieceList.length;i++){
            let testPiece = this.pieceList[i];
            if(testPiece.owner==this.getOpponent(aggressor) && testPiece.location){
                availableMoves += testPiece.getMoves(test).length;
            }
        }
        return availableMoves == 0;
    }
    checkForStalemate(defender:string):boolean{
        return this.checkForCheckmate(this.getOpponent(defender),true);
        //possibly add to this for other stalemates?
    }
    endGame(message:string){
        let playAgain = window.confirm(message + "\nDo you want to play again?");
        if(playAgain){
            window.location.reload();
        }
    }
}