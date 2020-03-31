# ChessApp

This is a browser-based, asynchronous application for playing Chess with other users online. This application is, at of the time of this writing, is deployed at https://infy-chess.surge.sh and was written as a companion to the Chess API at https://infy-chess-api.herokuapp.com/ChessAPI/. It is written in Angular, JavaScript, and Typescript.

## / (root directory)
This is the login page. Here users can log in or register as a new user. '#' is added to the paths programatically for reload/refresh support in deployment. There is also a credit link at the bottom for the background photo's photographer on unsplash. This consumes the /login endpoint of the API. On successful login, it redirects to /home.

## /register
This is the registration page for new users. This consumes the /register API endpoint. The username must not already exist in the database and the "Password" and "Confirm Password" fields must match. On an error, an appropriate message displays below. On success, the user is redirected to /home.

## /home
This lists the user's games, both active and finished. It consumes the /startgame and /games endpoints. The current user and a logout link are in the top left corner. The refresh symbol will refresh the list without reloading the page. This could be automatic, but was left manual to reduce usage of limited "free plan" database resources. The plus symbol opens a hidden form to challenge another user to a new game. The challenged user's name must be spelled correctly and is case-sensitive. 

Below that, the users games are displayed with, from left to right, their opponent's user name, how long ago the last move was made, and a dynamic button to show the game. If it is the logged-in user's turn and not yet ended, the button will say "Your Move." If not, it will say "View." If the game is over, it will display "You Won!" or "You Lost!" as appropriate. Stalemates and other draws are not supported at this time.

## /game/{gameId}
This is where the user can see and move a piece if it is their turn and the game is still active. If it is the logged-in user's turn, there are three buttons: Submit (to finalize the move), Undo (to take back an unsubmitted move), and Concede (to give up the game and declare the opponent the winner). If it is the opponent's turn, only the Concede button will appear. If the game is over, there are no buttons and there is a message saying which user won. In an active game, if the current user makes a move that results in Checkmate, the Submit button changes color and says Checkmate instead.

If it is the logged-in user's turn, they can click on any of their pieces, which will then highlight the space in blue and potential moves for that piece in green. If they click on a green space, the piece will move there. If they click on another of their pieces, the new pieces potential moves will highlight instead. If the user clicks anywhere else on the board, the highlights (if any will disappear). No spaces are highlighted if a player clicks on an opponent's piece, if it is not the logged-in player's turn, or if the game is over. Kings in check or checkmate are displayed in red.

Only legal moves will be highlighted, so the application will not permit a player putting themselves in check, including by moving a piece other than their king. Castle moves and En Passant are both supported. Pawn Promotion is also supported, but the pawn always becomes a queen. Stalemates, Draws for other reasons, and Timers are all not supported, but may appear in a later release.
