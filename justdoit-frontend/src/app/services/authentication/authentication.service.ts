import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthenticationSuccess} from 'src/app/models/loginResponse';
import {UserAuthenticationRequest} from 'src/app/models/user';
import { HandleErrorService } from '../handleError/handle-error.service';
import jwt_decode from 'jwt-decode';
import { TokenDecode } from 'src/app/models/tokenDecode';
import {ApiClientService} from "../todo-api";
import {RefreshTokenSuccess} from "../todo-api/models/refreshtokensuccess.model";
import {RegistrationRequest} from "../todo-api/models/registrationrequest.model";
import {UserTransport} from "../todo-api/models/usertransport.model";
import {ForgotPasswordRequest, ResetPasswordRequest} from "../todo-api/models";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authenticationSuccess: AuthenticationSuccess = {
    email: '',
    reason: '',
    authToken: '',
    refreshToken: '',
    userId: 0,
    username: '',
    success: false,
  };

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private authApiClientService: ApiClientService,
  ) {}

  public register(registrationRequest: RegistrationRequest): Observable<UserTransport> {
    return this.authApiClientService.registerAccountUsingPOST(registrationRequest);
  }

  public login(userAuthenticationRequest: UserAuthenticationRequest): Observable<AuthenticationSuccess> {
    return this.authApiClientService.loginUsingPOST(userAuthenticationRequest);
  }

  public forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Observable<any> {
    return this.authApiClientService.forgotPasswordUsingPOST(forgotPasswordRequest);
  }

  public confirmUser(token: string): Observable<any> {
    return this.authApiClientService.userConfirmationUsingGET(token);
  }

  public validateResetToken(token: string): Observable<any> {
    return this.authApiClientService.validateResetTokenUsingGET();
  }

  public resetToken(resetPasswordRequest: ResetPasswordRequest, token: string): Observable<any> {
    return this.authApiClientService.resetUserPasswordUsingPOST(resetPasswordRequest, token);
  }

  public addUserInfoToLocalStorage(result: RefreshTokenSuccess | AuthenticationSuccess,
                                   userId: number, username: string): void {
    const currentUser: AuthenticationSuccess = {
      email: result.email,
      authToken: result.authToken,
      refreshToken: result.refreshToken,
      userId: userId,
      username: username,
      reason: result.reason,
      success: true,
    };
    localStorage.setItem('current_user', JSON.stringify(currentUser));
    localStorage.setItem(
      'access_token',
      result.authToken
    );
    localStorage.setItem(
      'refresh_token',
      result.refreshToken
    );
  }

  public getTokenDecode(): TokenDecode {
    const token = this.authenticationSuccess?.authToken
      ? this.authenticationSuccess?.authToken
      : localStorage.getItem('access_token');

    if (token) {
      const user: TokenDecode = jwt_decode(token);
      return user;
    }
    return {} as TokenDecode;
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
