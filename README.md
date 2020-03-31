# ChessApp

This is a browser-based, asynchronous application for playing Chess with other users online. This application is, at of the time of this writing, is deployed at https://infy-chess.surge.sh and was written as a companion to the Chess API at https://infy-chess-api.herokuapp.com/ChessAPI/. It is written in Angular, JavaScript, and Typescript.

## / (root directory)
This is the login page. Here users can log in or register as a new user. '#' is added to the paths programatically for reload/refresh support in deployment. There is also a credit link at the bottom for the background photo's photographer on unsplash. This consumes the /login endpoint of the API. On successful login, it redirects to /home.

## /register
This is the registration page for new users. This consumes the /register API endpoint. The username must not already exist in the database and the "Password" and "Confirm Password" fields must match. On an error, an appropriate message displays below. On success, the user is redirected to /home.

## /home
This lists the user's games, both active and finished. It consumes the /startgame and /games endpoints. The current user and a logout link are in the top left corner. The refresh symbol will refresh the list without reloading the page. This could be automatic, but was left manual to reduce usage of limited "free plan" database resources. The plus symbol opens a hidden form to challenge another user to a new game. The challenged user's name must be spelled correctly and is case-sensitive. Below that, the users games are displayed with, from left to right, their opponent's user name, how long ago the last move was made, and a dynamic button to show the game. If it is the logged-in user's turn and not yet ended, the button will say "Your Move." If not, it will say "View." If the game is over, it will display "You Won!" or "You Lost!" as appropriate. Stalemates and draws are not supported at this time.
