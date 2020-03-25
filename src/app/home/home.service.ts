import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { GameStub } from '../models/GameStub';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {

  }
  getGames(): Observable<GameStub[]> {

    let sessionId = sessionStorage.getItem('session-id');
    this.headers = this.headers.set('session-id',sessionId);
    const url = environment.getGamesUrl;
    return this.http.get<GameStub[]>(url,{headers:this.headers})
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
