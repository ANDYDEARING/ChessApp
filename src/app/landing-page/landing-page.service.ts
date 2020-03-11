import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {

  }
  login(user: User): Observable<string> {
    const url = environment.loginUrl;
    return this.http.post(url,user,{headers:this.headers, responseType:'text'})
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
