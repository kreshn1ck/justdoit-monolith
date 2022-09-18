import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, EMPTY, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import {RefreshTokenService} from "../services/authentication/refreshtoken.service";
import {RefreshTokenSuccess} from "../services/todo-api/models";
import jwt_decode from "jwt-decode";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {LogoutService} from "../services/logout.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    isRefreshingToken = false;
    // @ts-ignore
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private router: Router,
                private logoutService: LogoutService,
                private refreshTokenService: RefreshTokenService,
                private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
      Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse) {
                switch ((<HttpErrorResponse>error).status) {
                    case 403:
                        return this.handleUnauthorizedError(request, next);
                    case 401:
                        if( error.message.indexOf('AccessDeniedException') == -1 ) {
                            return this.handleUnauthorizedError(request, next);
                        }
                        return throwError(error);
                    default:
                        return throwError(error);
                }
            } else {
                return throwError(error);
            }
        }));
    }


  private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;

        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken == null) {
            this.isRefreshingToken = false;
            this.logoutService.logout();
            return EMPTY;
        }

        // Reset here so that the following requests wait until the token
        // comes back from the refreshToken call.
        // @ts-ignore
      this.tokenSubject.next(null);

        return this.refreshTokenService.refreshToken(refreshToken)
          .pipe(switchMap((authenticationResult: RefreshTokenSuccess) => {
              const decodedToken = jwt_decode<any>(authenticationResult.authToken);
              this.authenticationService.addUserInfoToLocalStorage(authenticationResult, decodedToken.id, decodedToken.usr);

              this.logoutService.loggedOut.next(false);

              this.isRefreshingToken = false;
              this.tokenSubject.next(authenticationResult.refreshToken);
              return next.handle(this.appendToken(request));
        }), catchError(err => {
          this.isRefreshingToken = false;
          this.logoutService.logout();
          return EMPTY;
        }));
    } else {
        return this.tokenSubject.pipe(filter(token => token != null), take(1), switchMap(token => {
            return next.handle(this.appendToken(request));
        }));
    }
  }

  private appendToken(request: HttpRequest<any>) {
        const jwtToken = localStorage.getItem('access_token');
        if (jwtToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
        }
        return request;
  }
}
