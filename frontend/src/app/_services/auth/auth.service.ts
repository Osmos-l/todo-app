import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private API = "http://127.0.0.1:3000/api/auth";

  constructor(private http: HttpClient,
              private router: Router) { }

  public isAuth(): boolean {
    const token = localStorage.getItem('token');
    if ( token === null ) {
      return false;
    }

    return !jwtHelper.isTokenExpired(token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUser(): User | null {
    let user = localStorage.getItem('user');

    if ( user == null ) {
      return null;
    }
    else {
      return <User>JSON.parse( user );
    }

  }

  public login( username: string, password: string): Observable<boolean> {

    return this.http.post<{ token: string, user: User }>( this.API + "/login", {
      email: username,
      password: password
    }, this._options ).pipe(
      map( result => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify( result.user ) );
        return true;
      })
    );
  }

  public signup( email: string, username: string, password: string): Observable<boolean> {

    return this.http.post( this.API + "/signup", {
      email: email,
      username: username,
      password: password
    }, this._options ).pipe(
      map( result => {
        return true;
      })
    );
  }

  public logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
  
}
