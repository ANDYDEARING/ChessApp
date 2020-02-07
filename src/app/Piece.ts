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
    public getMoves():string[]{
        var potentialMoveSpaces : string[] = [];
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
        return potentialMoveSpaces;
    }
    
    getPawnMoves():string[]{
        let row:number = parseInt(this.location[0]);
        let column:string = this.location[1];
        var potentialMoveSpaces : string[] = [];
        let direction = 0;
        let maxMove = 1;
    
        if(this.owner=="WHITE"){
            direction = 1;
            if(row==2){
                maxMove = 2;
            }
        } else if (this.owner=="BLACK"){
            direction = -1;
            if(row==7){
                maxMove = 2;
            }
        }
    
        for(let i=1;i<=maxMove;i++){
            potentialMoveSpaces.push( (row+(direction*i)).toString() + column);
        }
        return potentialMoveSpaces;
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