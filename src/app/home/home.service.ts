import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {

  }
  getGames(): Observable<String> {

    let sessionId = sessionStorage.getItem('session-id');
    this.headers = this.headers.append('session-id',sessionId);
    console.log(sessionId);
    console.log(this.headers.keys());
    const url = environment.getGamesUrl;
    return this.http.get<String>(url,{headers:this.headers})
    .pipe(catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse){
    console.log(err);
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
