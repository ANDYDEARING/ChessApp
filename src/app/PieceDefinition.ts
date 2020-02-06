export class PieceDefinition {
    public getPieceName(pieceChar){
        if(pieceChar == '♟'){
            return "top pawn";
        } else if (pieceChar=='♙'){
            return "bottom pawn";
        }
    }
}