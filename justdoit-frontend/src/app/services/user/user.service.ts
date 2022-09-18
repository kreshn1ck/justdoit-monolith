import { Injectable } from '@angular/core';
import {ApiClientService} from "../todo-api";
import {Observable} from "rxjs";
import {UserRelationshipTransport} from "../todo-api/models/userrelationshiptransport.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private apiClientService: ApiClientService,
  ) {}

  public asd(): Observable<UserRelationshipTransport> {
    return this.apiClientService.createUsingPOST_1(4);
  }
}
