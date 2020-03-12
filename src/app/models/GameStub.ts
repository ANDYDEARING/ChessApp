import { Piece } from './Piece';

export class GameStub{
    whiteUser: string;
    blackUser: string;
    gameID: number;
    lastMove: string;
    isWhiteTurn: boolean;
    piecesList: Piece[];
}