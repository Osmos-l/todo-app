import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    console.log( "checking can activate !");
    if ( !this.auth.isAuth() ) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
