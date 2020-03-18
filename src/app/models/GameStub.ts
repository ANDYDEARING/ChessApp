import { Piece } from './Piece';

export class GameStub{
    whiteUser: string;
    blackUser: string;
    gameID: number;
    lastMove: Date;
    isWhiteTurn: boolean;
    piecesList: Piece[];
}