import { ChessBoard } from './ChessBoard';

export class Piece{

    public symbol : string;
    public name : string;
    public owner : string;
    public location : number[];
    public board : ChessBoard;

    private ownerNames: string[] = ["WHITE","BLACK"];
    private pieceNames: string[] = ["KING","QUEEN","BISHOP","KNIGHT","ROOK","PAWN"];
    private whiteSymbols: string[] = ["♔","♕","♗","♘","♖","♙"];
    private blackSymbols: string[] = ["♚","♛","♝","♞","♜","♟"];
    
    constructor(owner:string, name:string, location:number[], board:ChessBoard){

        this.board = board;

        if(this.ownerNames.includes(owner.toUpperCase())){
            this.owner = owner.toUpperCase();
        } else {
            throw new TypeError("Invalid Owner Name: " + owner);
        }

        if(this.pieceNames.includes(name.toUpperCase())){
            this.name = name.toUpperCase();
        } else {
            throw new TypeError("Invalid Piece Name: " + name);
        }

        if(board.validateCoord(location)){
            this.location = location;
        } else {
            throw new TypeError("Invalid Location: " + location);
        }
        
        this.symbol = this.getSymbol();
    }
    getSymbol(){
        if(this.owner == "BLACK"){
            return this.blackSymbols[this.pieceNames.indexOf(this.name)];
        } else if (this.owner == "WHITE") {
            return this.whiteSymbols[this.pieceNames.indexOf(this.name)];
        }
    }

    public getMoves(test:boolean=false):number[][]{
        var potentialMoveSpaces : number[][] = [];
        switch(this.name){
            case "PAWN":
            potentialMoveSpaces = this.getPawnMoves();
            break;
            case "ROOK":
            potentialMoveSpaces = this.getRookMoves();
            break;
            case "KNIGHT":
            potentialMoveSpaces = this.getKnightMoves();
            break;
            case "BISHOP":
            potentialMoveSpaces = this.getBishopMoves();
            break;
            case "QUEEN":
            potentialMoveSpaces = this.getQueenMoves();
            break;
            case "KING":
            potentialMoveSpaces = this.getKingMoves();
            break;
        }
        if(!test){
            potentialMoveSpaces = this.removeIllegalMoves(potentialMoveSpaces);
        }
        return potentialMoveSpaces;
    }
    
    getPawnMoves(): number[][]{
        var potentialMoveSpaces : number[][] = [];
        let direction = 0;
        let maxMove = 1;
    
        if(this.owner=="WHITE"){
            direction = -1;
            if(this.location[1]==6){
                maxMove = 2;
            }
        } else if (this.owner=="BLACK"){
            direction = 1;
            if(this.location[1]==1){
                maxMove = 2;
            }
        }
    
        for(let i=1;i<=maxMove;i++){
            let coord = [this.location[0], this.location[1]+(direction*i)];
            if(this.board.validateCoord(coord) && 
            !this.board.getPieceAtLocation(coord) ){
                potentialMoveSpaces.push(coord);
            } else {
                break;
            }
        }

        let aheadLeft = [this.location[0] - 1, this.location[1] + direction];
        if(this.board.validateCoord(aheadLeft) && 
          this.board.getPieceAtLocation(aheadLeft)){
            if(this.board.getPieceAtLocation(aheadLeft).owner != this.owner){
                potentialMoveSpaces.push(aheadLeft);
            }
        }

        let aheadRight = [this.location[0] + 1, this.location[1] + direction];
        if(this.board.validateCoord(aheadRight) && 
          this.board.getPieceAtLocation(aheadRight)){
            if(this.board.getPieceAtLocation(aheadRight).owner != this.owner){
                potentialMoveSpaces.push(aheadRight);
            }
        }

        if(this.board.enPassantCoord){
            if(aheadLeft[0] == this.board.enPassantCoord[0] 
                && aheadLeft[1] == this.board.enPassantCoord[1]){
                potentialMoveSpaces.push(aheadLeft);
            } else if(aheadRight[0] == this.board.enPassantCoord[0] 
                && aheadRight[1] == this.board.enPassantCoord[1]){
                potentialMoveSpaces.push(aheadRight);
            }
        }

        return potentialMoveSpaces;
    }
    private getRookMoves(){
    var potentialMoveSpaces : number[][] = [];
    let maxMove = 7;

    //north
    for(let i=1;i<=maxMove;i++){
        let coord = [this.location[0], this.location[1]-i];
        if(this.board.validateCoord(coord)
        &&!this.board.getPieceAtLocation(coord)){
            potentialMoveSpaces.push(coord);
        } else if(this.board.validateCoord(coord) 
        && this.board.getPieceAtLocation(coord).owner != this.owner){
            potentialMoveSpaces.push(coord);
            break;
        } else {
            break;
        }
    }
    //south
    for(let i=1;i<=maxMove;i++){
        let coord = [this.location[0], this.location[1]+i];
        if(this.board.validateCoord(coord)
        &&!this.board.getPieceAtLocation(coord)){
            potentialMoveSpaces.push(coord);
        } else if(this.board.validateCoord(coord) 
        && this.board.getPieceAtLocation(coord).owner != this.owner){
            potentialMoveSpaces.push(coord);
            break;
        } else {
            break;
        }
    }
    //east
    for(let i=1;i<=maxMove;i++){
        let coord = [this.location[0]+i, this.location[1]];
        if(this.board.validateCoord(coord)
        &&!this.board.getPieceAtLocation(coord)){
            potentialMoveSpaces.push(coord);
        } else if(this.board.validateCoord(coord) 
        && this.board.getPieceAtLocation(coord).owner != this.owner){
            potentialMoveSpaces.push(coord);
            break;
        } else {
            break;
        }
    }
    //west
    for(let i=1;i<=maxMove;i++){
        let coord = [this.location[0]-i, this.location[1]];
        if(this.board.validateCoord(coord)
        &&!this.board.getPieceAtLocation(coord)){
            potentialMoveSpaces.push(coord);
        } else if(this.board.validateCoord(coord) 
        && this.board.getPieceAtLocation(coord).owner != this.owner){
            potentialMoveSpaces.push(coord);
            break;
        } else {
            break;
        }
    }
    return potentialMoveSpaces;
    }
    private getKnightMoves(){
    let potentialMoveSpaces : number[][] = [];
    for(let x=-2;x<=2;x++){
        for(let y=-2;y<=2;y++){
            let coord = [this.location[0]+x, this.location[1]+y];
            if( (this.board.validateCoord(coord)) && x!=0 && y!=0
            && (Math.abs(x)!=Math.abs(y)) && (!this.board.getPieceAtLocation(coord)
            || this.board.getPieceAtLocation(coord).owner != this.owner) ){
                potentialMoveSpaces.push(coord);
            }
        }
    }
    return potentialMoveSpaces;
    }
    private getBishopMoves(){
    var potentialMoveSpaces : number[][] = [];
    let maxMove = 7;

    //northeast
    for(let i=1;i<=maxMove;i++){
        let coord = [this.location[0]+i, this.location[1]-i];
        if(this.board.validateCoord(coord)
        &&!this.board.getPieceAtLocation(coord)){
            potentialMoveSpaces.push(coord);
        } else if(this.board.validateCoord(coord) 
        && this.board.getPieceAtLocation(coord).owner != this.owner){
            potentialMoveSpaces.push(coord);
            break;
        } else {
            break;
        }
    }
    //southeast
    for(let i=1;i<=maxMove;i++){
        let coord = [this.location[0]+i, this.location[1]+i];
        if(this.board.validateCoord(coord)
        &&!this.board.getPieceAtLocation(coord)){
            potentialMoveSpaces.push(coord);
        } else if(this.board.validateCoord(coord) 
        && this.board.getPieceAtLocation(coord).owner != this.owner){
            potentialMoveSpaces.push(coord);
            break;
        } else {
            break;
        }
    }
    //northwest
    for(let i=1;i<=maxMove;i++){
        let coord = [this.location[0]-i, this.location[1]-i];
        if(this.board.validateCoord(coord)
        &&!this.board.getPieceAtLocation(coord)){
            potentialMoveSpaces.push(coord);
        } else if(this.board.validateCoord(coord) 
        && this.board.getPieceAtLocation(coord).owner != this.owner){
            potentialMoveSpaces.push(coord);
            break;
        } else {
            break;
        }
    }
    //southwest
    for(let i=1;i<=maxMove;i++){
        let coord = [this.location[0]-i, this.location[1]+i];
        if(this.board.validateCoord(coord)
        &&!this.board.getPieceAtLocation(coord)){
            potentialMoveSpaces.push(coord);
        } else if(this.board.validateCoord(coord) 
        && this.board.getPieceAtLocation(coord).owner != this.owner){
            potentialMoveSpaces.push(coord);
            break;
        } else {
            break;
        }
    }
    return potentialMoveSpaces;
    }
    private getQueenMoves(){
    var potentialMoveSpaces : number[][] = this.getBishopMoves();
    let rookMoves : number[][] = this.getRookMoves();
    for(let i=0;i<rookMoves.length;i++){
        potentialMoveSpaces.push(rookMoves[i]);
    }
    return potentialMoveSpaces;
    }
    private getKingMoves(){
        let potentialMoveSpaces : number[][] = [];
        for(let x=-1;x<=1;x++){
        for(let y=-1;y<=1;y++){
            let coord = [this.location[0]+x, this.location[1]+y];
            if( (this.board.validateCoord(coord)) && (x!=0 || y!=0) 
            && (!this.board.getPieceAtLocation(coord)
            || this.board.getPieceAtLocation(coord).owner != this.owner) ){
                potentialMoveSpaces.push(coord);
            }
        }
        }
        if(this.board.canCastle(this)){
        let castleRooks = this.board.canCastle(this);
        let clearRight:boolean = false;
        let clearLeft:boolean = false;
        for(let i=0;i<castleRooks.length;i++){
            if(castleRooks[i].location[0]==0){
                clearLeft = true;
                for(let x=1;x<=3;x++){
                    if(this.board.getPieceAtLocation([x, this.location[1]])){
                        clearLeft = false;
                    }
                }
                if(clearLeft){
                    potentialMoveSpaces.push([this.location[0]-2, this.location[1]]);
                }
            } else {
                clearRight = true;
                for(let x=5;x<=6;x++){
                    if(this.board.getPieceAtLocation([x, this.location[1]])){
                        clearRight = false;
                    }
                }
                if(clearRight){
                    potentialMoveSpaces.push([this.location[0]+2, this.location[1]]);
                }
            }
        }
        }
        return potentialMoveSpaces;
    }
    removeIllegalMoves(moveCoords:number[][]):number[][]{
        let resultCoordList:number[][] = [];
        for(let i=0;i<moveCoords.length;i++){
            //deep copy
            let boardClone = this.board.makeClone();
            let clonePiece = boardClone.getPieceAtLocation(this.location);
            boardClone.moveClonePiece(clonePiece,moveCoords[i]);
            if(!boardClone.checkForCheck(this.board.getOpponent(this.owner))){
                resultCoordList.push(moveCoords[i]);
            }
        }
        return resultCoordList;
    }
    makeClone(board:ChessBoard):Piece{
        let clone = new Piece(this.owner, this.name, this.location, board);
        return clone;
    }
}