import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const jwtHelper = new JwtHelperService();
const API = "http://127.0.0.1:3000/api/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  public isAuth(): boolean {

    const token = localStorage.getItem('token');
    if ( token === null ) {
      return false;
    }

    return !jwtHelper.isTokenExpired(token);
  }

  public login( username: string, password: string): Observable<boolean> {

    return this.http.post<{ token: string }>( API + "/login", {
      email: username,
      password: password
    }, this._options ).pipe(
      map( result => {
        localStorage.setItem('token', result.token);
        return true;
      })
    );
  }

  public signup( email: string, username: string, password: string): Observable<boolean> {

    return this.http.post<{ token: string }>( API + "/signup", {
      email: email,
      username: username,
      password: password
    }, this._options ).pipe(
      map( result => {
        return true;
      })
    );
  }
}
