import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  public loggedOut = new  BehaviorSubject<boolean>(true);

  constructor(private router: Router) {
    if (localStorage.getItem('current_user')) {
      this.loggedOut.next(false);
    }
  }

  public logout() {
    if (this.loggedOut.value) {
      return;
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    localStorage.removeItem('refresh_token');
    this.loggedOut.next(true);
    this.router.navigateByUrl('/login');
  }
}
