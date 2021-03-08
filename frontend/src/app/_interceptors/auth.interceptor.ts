import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    if ( token ) {
      request = request.clone( {
        setHeaders: {
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json",
          "Authorization": `Bearer ${ token }`
        }
      } );

    }
    return next.handle(request);
  }
}
