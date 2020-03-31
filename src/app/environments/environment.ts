// const PROTOCOL: string = "https://";
// const HOSTNAME: string = "infy-chess-api.herokuapp.com";
const APPLICATION_NAME : string = "/ChessAPI"

const PROTOCOL: string = "http://";
const HOSTNAME: string = "localhost:5000";


export const environment = {
    loginUrl: PROTOCOL + HOSTNAME + APPLICATION_NAME + '/login',
    registrationUrl: PROTOCOL + HOSTNAME + APPLICATION_NAME + '/register',
    getGamesUrl: PROTOCOL + HOSTNAME + APPLICATION_NAME + '/games',
    getGameUrl: PROTOCOL + HOSTNAME + APPLICATION_NAME + '/getgame/',
    submitUrl: PROTOCOL + HOSTNAME + APPLICATION_NAME + '/submit',
    challengeOpponentUrl: PROTOCOL + HOSTNAME + APPLICATION_NAME + '/startgame/'
};