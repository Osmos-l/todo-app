import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const jwtHelper = new JwtHelperService();
const API = "http://127.0.0.1:3000/api/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient,
              private router: Router) { }

  /**
   * TODO: Comment method role
   */
  public isAuth(): boolean {

    const token = localStorage.getItem('token');
    if ( token === null ) {
      return false;
    }

    return !jwtHelper.isTokenExpired(token);
  }

  /**
   * TODO: Comment method role
   * @param username 
   * @param password 
   */
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

  /**
   * TODO: Comment method role
   * @param email 
   * @param username 
   * @param password 
   */
  public signup( email: string, username: string, password: string): Observable<boolean> {

    return this.http.post<{ token: string, userId: string }>( API + "/signup", {
      email: email,
      username: username,
      password: password
    }, this._options ).pipe(
      map( result => {
        localStorage.setItem('userId', result.userId);
        return true;
      })
    );
  }

  /**
   * TODO: Comment method role
   */
  public logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}