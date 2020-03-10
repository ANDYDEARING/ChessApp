import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  private headers = new HttpHeaders({ 'Content-Type':'application/json'});
  constructor(private http: HttpClient) {

  }
  login(user: User): Observable<String> {
    const url = environment.loginUrl;
    return null;
  }
}
