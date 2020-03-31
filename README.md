# ChessApp

This is a browser-based, asynchronous application for playing Chess with other users online. This application is, at of the time of this writing, is deployed at https://infy-chess.surge.sh and was written as a companion to the Chess API at https://infy-chess-api.herokuapp.com/ChessAPI/. It is written in Angular, JavaScript, and Typescript.

## / (root directory)
This is the login page. Here users can log in or register as a new user. '#' is added to the paths programatically for reload/refresh support in deployment. There is also a credit link at the bottom for the background photo's photographer on unsplash. This consumes the /login endpoint of the API. On successful login, it redirects to /home.

## /register
This is the registration page for new users. This consumes the /register API endpoint. The username must not already exist in the database and the "Password" and "Confirm Password" fields must match. On an error, an appropriate message displays below. On success, the user is redirected to /home.
