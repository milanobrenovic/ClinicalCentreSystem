import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                localStorage.removeItem('LoggedInUser');
                this.router.navigate(['/error/non-authenticated']);
            } else if (err.status === 403) {
                this.router.navigate(['/error/non-authorized']);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}