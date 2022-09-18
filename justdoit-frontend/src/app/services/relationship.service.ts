import { Injectable } from '@angular/core';
import {ApiClientService} from './todo-api';
import {Observable} from 'rxjs';
import {UserRelationshipTransport} from './todo-api/models/userrelationshiptransport.model';

@Injectable({
  providedIn: 'root',
})
export class RelationshipService {

  constructor(
    private apiClientService: ApiClientService,
  ) {}

  public getAllPeople(): Observable<UserRelationshipTransport[]> {
    return this.apiClientService.getAllPeopleUsingGET();
  }
}
