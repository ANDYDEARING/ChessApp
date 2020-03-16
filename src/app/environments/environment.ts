const HOSTNAME: string = "infy-chess-api.herokuapp.com";
const APPLICATION_NAME : string = "/ChessAPI"

export const environment = {
    loginUrl: 'https://' + HOSTNAME + APPLICATION_NAME + '/login',
    getGamesUrl: 'https://' + HOSTNAME + APPLICATION_NAME + '/games'
};