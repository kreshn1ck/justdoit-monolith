import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  AuthenticationSuccess,
  ForgotPasswordRequest,
  RefreshTokenSuccess,
  RegistrationRequest,
  ResetPasswordRequest,
  TodoTransport,
  UserAuthenticationRequest,
  UserRelationshipTransport,
  UserTransport
} from './models';

/**
* Created with angular-swagger-client-generator.
*/
@Injectable({
  providedIn: 'root',
})
export class ApiClientService {

  private domain = 'http://localhost:8080';

  constructor(private http: HttpClient, @Optional() @Inject('domain') domain: string ) {
    if (domain) {
      this.domain = domain;
    }
  }

  /**
  * Method getAllPeopleUsingGET
  * @return Full HTTP response as Observable
  */
  public getAllPeopleUsingGET(): Observable<UserRelationshipTransport[]> {
    let uri = `/api/relationship/all`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<UserRelationshipTransport[]>('get', uri, headers, params, null);
  }

  /**
  * Method getAllFriendsUsingGET
  * @return Full HTTP response as Observable
  */
  public getAllFriendsUsingGET(): Observable<UserRelationshipTransport[]> {
    let uri = `/api/relationship/friends`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<UserRelationshipTransport[]>('get', uri, headers, params, null);
  }

  /**
  * Method geAllPendingRequestsUsingGET
  * @return Full HTTP response as Observable
  */
  public geAllPendingRequestsUsingGET(): Observable<UserRelationshipTransport[]> {
    let uri = `/api/relationship/pending`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<UserRelationshipTransport[]>('get', uri, headers, params, null);
  }

  /**
  * Method getAllRequestedRequestsUsingGET
  * @return Full HTTP response as Observable
  */
  public getAllRequestedRequestsUsingGET(): Observable<UserRelationshipTransport[]> {
    let uri = `/api/relationship/requested`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<UserRelationshipTransport[]>('get', uri, headers, params, null);
  }

  /**
  * Method getUsingGET_1
  * @param id id
  * @return Full HTTP response as Observable
  */
  public getUsingGET_1(id: number): Observable<UserRelationshipTransport> {
    let uri = `/api/relationship/${id}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<UserRelationshipTransport>('get', uri, headers, params, null);
  }

  /**
  * Method createUsingPOST_1
  * @param id id
  * @return Full HTTP response as Observable
  */
  public createUsingPOST_1(id: number): Observable<UserRelationshipTransport> {
    let uri = `/api/relationship/${id}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<UserRelationshipTransport>('post', uri, headers, params, null);
  }

  /**
  * Method deleteUsingDELETE_1
  * @param id id
  * @return Full HTTP response as Observable
  */
  public deleteUsingDELETE_1(id: number): Observable<any> {
    let uri = `/api/relationship/${id}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('delete', uri, headers, params, null);
  }

  /**
  * Method acceptUsingPUT
  * @param id id
  * @return Full HTTP response as Observable
  */
  public acceptUsingPUT(id: number): Observable<UserRelationshipTransport> {
    let uri = `/api/relationship/${id}/accept`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<UserRelationshipTransport>('put', uri, headers, params, null);
  }

  /**
  * Method cancelUsingDELETE
  * @param id id
  * @return Full HTTP response as Observable
  */
  public cancelUsingDELETE(id: number): Observable<any> {
    let uri = `/api/relationship/${id}/cancel`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('delete', uri, headers, params, null);
  }

  /**
  * Method rejectUsingPUT
  * @param id id
  * @return Full HTTP response as Observable
  */
  public rejectUsingPUT(id: number): Observable<UserRelationshipTransport> {
    let uri = `/api/relationship/${id}/reject`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<UserRelationshipTransport>('put', uri, headers, params, null);
  }

  /**
  * Method createUsingPOST
  * @param todoTransport todoTransport
  * @return Full HTTP response as Observable
  */
  public createUsingPOST(todoTransport: TodoTransport): Observable<TodoTransport> {
    let uri = `/api/todos`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<TodoTransport>('post', uri, headers, params, JSON.stringify(todoTransport));
  }

  /**
  * Method getAssignedTodosUsingGET
  * @param oldestFirst oldestFirst
  * @return Full HTTP response as Observable
  */
  public getAssignedTodosUsingGET(oldestFirst: boolean): Observable<TodoTransport[]> {
    let uri = `/api/todos/assigned`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if (oldestFirst !== undefined && oldestFirst !== null) {
      params = params.set('oldestFirst', oldestFirst + '');
    }
    return this.sendRequest<TodoTransport[]>('get', uri, headers, params, null);
  }

  /**
  * Method getCreatedTodosUsingGET
  * @param oldestFirst oldestFirst
  * @return Full HTTP response as Observable
  */
  public getCreatedTodosUsingGET(oldestFirst: boolean): Observable<TodoTransport[]> {
    let uri = `/api/todos/created`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if (oldestFirst !== undefined && oldestFirst !== null) {
      params = params.set('oldestFirst', oldestFirst + '');
    }
    return this.sendRequest<TodoTransport[]>('get', uri, headers, params, null);
  }

  /**
  * Method getUsingGET
  * @param todoId todoId
  * @return Full HTTP response as Observable
  */
  public getUsingGET(todoId: number): Observable<TodoTransport> {
    let uri = `/api/todos/${todoId}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<TodoTransport>('get', uri, headers, params, null);
  }

  /**
  * Method updateUsingPUT
  * @param todoId todoId
  * @param todoTransport todoTransport
  * @return Full HTTP response as Observable
  */
  public updateUsingPUT(todoId: number, todoTransport: TodoTransport): Observable<TodoTransport> {
    let uri = `/api/todos/${todoId}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<TodoTransport>('put', uri, headers, params, JSON.stringify(todoTransport));
  }

  /**
  * Method deleteUsingDELETE
  * @param todoId todoId
  * @return Full HTTP response as Observable
  */
  public deleteUsingDELETE(todoId: number): Observable<any> {
    let uri = `/api/todos/${todoId}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('delete', uri, headers, params, null);
  }

  /**
  * Method markFinishedUsingPUT
  * @param todoId todoId
  * @return Full HTTP response as Observable
  */
  public markFinishedUsingPUT(todoId: number): Observable<TodoTransport> {
    let uri = `/api/todos/${todoId}/finished`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<TodoTransport>('put', uri, headers, params, null);
  }

  /**
  * Method markNotFinishedUsingPUT
  * @param todoId todoId
  * @return Full HTTP response as Observable
  */
  public markNotFinishedUsingPUT(todoId: number): Observable<TodoTransport> {
    let uri = `/api/todos/${todoId}/not-finished`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<TodoTransport>('put', uri, headers, params, null);
  }

  /**
  * Method loginUsingPOST
  * @param userAuthenticationRequest userAuthenticationRequest
  * @return Full HTTP response as Observable
  */
  public loginUsingPOST(userAuthenticationRequest: UserAuthenticationRequest): Observable<AuthenticationSuccess> {
    let uri = `/auth/login`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<AuthenticationSuccess>('post', uri, headers, params, JSON.stringify(userAuthenticationRequest));
  }

  /**
  * Method refreshTokenUsingGET
  * @param token token
  * @return Full HTTP response as Observable
  */
  public refreshTokenUsingGET(token: string): Observable<RefreshTokenSuccess> {
    let uri = `/auth/refresh-token/${token}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<RefreshTokenSuccess>('get', uri, headers, params, null);
  }

  /**
  * Method validateResetTokenUsingGET
  * @return Full HTTP response as Observable
  */
  public validateResetTokenUsingGET(): Observable<any> {
    let uri = `/test`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params, null);
  }

  /**
  * Method forgotPasswordUsingPOST
  * @param forgotPasswordRequest forgotPasswordRequest
  * @return Full HTTP response as Observable
  */
  public forgotPasswordUsingPOST(forgotPasswordRequest: ForgotPasswordRequest): Observable<any> {
    let uri = `/users/forgot-password`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(forgotPasswordRequest));
  }

  /**
  * Method validateResetTokenUsingGET_1
  * @param token token
  * @return Full HTTP response as Observable
  */
  public validateResetTokenUsingGET_1(token: string): Observable<any> {
    let uri = `/users/reset-password/${token}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params, null);
  }

  /**
  * Method resetUserPasswordUsingPOST
  * @param resetPasswordRequest resetPasswordRequest
  * @param token token
  * @return Full HTTP response as Observable
  */
  public resetUserPasswordUsingPOST(resetPasswordRequest: ResetPasswordRequest, token: string): Observable<any> {
    let uri = `/users/reset-password/${token}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(resetPasswordRequest));
  }

  /**
  * Method registerAccountUsingPOST
  * @param registrationRequest registrationRequest
  * @return Full HTTP response as Observable
  */
  public registerAccountUsingPOST(registrationRequest: RegistrationRequest): Observable<UserTransport> {
    let uri = `/users/sign-up`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<UserTransport>('post', uri, headers, params, JSON.stringify(registrationRequest));
  }

  /**
  * Method userConfirmationUsingGET
  * @param token token
  * @return Full HTTP response as Observable
  */
  public userConfirmationUsingGET(token: string): Observable<any> {
    let uri = `/users/user-confirmation/${token}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params, null);
  }

  private sendRequest<T>(method: string, uri: string, headers: HttpHeaders, params: HttpParams, body: any): Observable<T> {
    if (method === 'get') {
      return this.http.get<T>(this.domain + uri, { headers: headers.set('Accept', 'application/json'), params: params });
    } else if (method === 'put') {
      return this.http.put<T>(this.domain + uri, body, { headers: headers.set('Content-Type', 'application/json'), params: params });
    } else if (method === 'post') {
      return this.http.post<T>(this.domain + uri, body, { headers: headers.set('Content-Type', 'application/json'), params: params });
    } else if (method === 'delete') {
      return this.http.delete<T>(this.domain + uri, { headers: headers, params: params });
    } else {
      console.error('Unsupported request: ' + method);
      return Observable.throw('Unsupported request: ' + method);
    }
  }
}
