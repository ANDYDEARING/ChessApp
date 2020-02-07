export class Piece{

    public symbol : string;
    public name : string;
    public owner : string;
    public location : string;

    private ownerNames: string[] = ["WHITE","BLACK"];
    private pieceNames: string[] = ["KING","QUEEN","BISHOP","KNIGHT","ROOK","PAWN"];
    private whiteSymbols: string[] = ["♔","♕","♗","♘","♖","♙"];
    private blackSymbols: string[] = ["♚","♛","♝","♞","♜","♟"];
    
    constructor(owner:string, name:string, location:string){

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

        if(location.match('^[1-8][a-hA-H]$')){
            this.location = location.toUpperCase();
        } else {
            throw new TypeError("Invalid Location: " + location);
        }
        
        this.symbol = this.getSymbol();
    }
    private getSymbol(){
        if(this.owner == "BLACK"){
            return this.blackSymbols[this.pieceNames.indexOf(this.name)];
        } else if (this.owner == "WHITE") {
            return this.whiteSymbols[this.pieceNames.indexOf(this.name)];
        }
    }
    public display(){
        document.getElementById(this.location).innerText = this.symbol;
    }
    public showMoves(){
        let potentialMoveSpaces : string[] = [];
        switch(this.name){
            case "PAWN":
            potentialMoveSpaces = this.getPawnMoves();
            case "ROOK":
            potentialMoveSpaces = this.getRookMoves();
            case "KNIGHT":
            potentialMoveSpaces = this.getKnightMoves();
            case "BISHOP":
            potentialMoveSpaces = this.getBishopMoves();
            case "QUEEN":
            potentialMoveSpaces = this.getQueenMoves();
            case "KING":
            potentialMoveSpaces = this.getKingMoves();
        }
    }
    private getPawnMoves(){
        console.log("row: " + this.location[0]);
        console.log("column: " + this.location[1]);
        return null;
    }
    private getRookMoves(){
        return null;
    }
    private getKnightMoves(){
        return null;
    }
    private getBishopMoves(){
        return null;
    }
    private getQueenMoves(){
        return null;
    }
    private getKingMoves(){
        return null;
    }
}