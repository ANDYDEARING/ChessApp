import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GameStub } from '../models/GameStub';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {

  }

  getGame(id:string): Observable<GameStub> {
    let sessionId = sessionStorage.getItem('session-id');
    this.headers = this.headers.set('session-id',sessionId);
    const url = environment.getGameUrl + id;
    return this.http.get<GameStub>(url,{headers:this.headers})
    .pipe(catchError(this.handleError))
  }

  submitMove(gameStub:GameStub): Observable<boolean>{
    const url = environment.submitUrl;
    let sessionId = sessionStorage.getItem('session-id');
    this.headers = this.headers.set('session-id',sessionId);
    return this.http.post<boolean>(url,gameStub,{headers:this.headers})
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
