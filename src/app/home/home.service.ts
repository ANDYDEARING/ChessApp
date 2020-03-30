import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { GameStub } from '../models/GameStub';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'session-id': 'test-session-id'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {

  }
  getGames(): Observable<GameStub[]> {
    let sessionId = sessionStorage.getItem('session-id');
    httpOptions.headers = httpOptions.headers.set('session-id',sessionId);
    const url = environment.getGamesUrl;
    return this.http.get<GameStub[]>(url,{headers:httpOptions.headers})
    .pipe(catchError(this.handleError))
  }

  challengeOpponent(opponent:string): Observable<boolean>{
    console.log("Made it to challenge opponent in homeService");
    let sessionId = sessionStorage.getItem('session-id');
    httpOptions.headers = httpOptions.headers.set('session-id',sessionId);
    const url = environment.challengeOpponentUrl + opponent;
    return this.http.post<boolean>(url,null,{headers:httpOptions.headers})
    .pipe(catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse){
    let errMsg:string='';
    if(err.error instanceof Error){
      errMsg = err.error.message;
    } else if(typeof err.error === 'string'){
      errMsg=JSON.parse(err.error).message;
    } else if(err.status==0){
      errMsg="A connection to the backend can not be established."
    } else {
      errMsg=err.error.message;
    }
    return throwError(errMsg);
  }
}
