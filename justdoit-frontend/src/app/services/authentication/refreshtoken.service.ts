import { Injectable } from '@angular/core';
import {ApiClientService} from "../todo-api";
import { Observable } from 'rxjs';
import {RefreshTokenSuccess} from "../todo-api/models";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor(private authApiClientService: ApiClientService) { }

  public refreshToken(token: string): Observable<RefreshTokenSuccess> {
    return this.authApiClientService.refreshTokenUsingGET(token);
  }
}
