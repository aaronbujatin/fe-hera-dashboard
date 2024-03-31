import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authenticationService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authenticationService.clearLocalStorage();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}





