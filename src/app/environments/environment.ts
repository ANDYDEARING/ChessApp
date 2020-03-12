const HOSTNAME: string = "infy-chess-api.herokuapp.com";
const APPLICATION_NAME : string = "/ChessAPI"

export const environment = {
    loginUrl: 'http://' + HOSTNAME + APPLICATION_NAME + '/login',
    getGamesUrl: 'http://' + HOSTNAME + APPLICATION_NAME + '/games'
};