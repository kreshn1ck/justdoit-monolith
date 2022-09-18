import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.scss']
})
export class UserConfirmationComponent implements OnInit, OnDestroy {

  private token: string = "";
  private routeSubscription: Subscription;

  public errorMessages: { [key: string]: string } = {};
  public errorMessage: string = '';
  public isSuccess = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar) {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const items: any = params;
      console.log(items);
      this.token = items.params.token;
      console.log("token", this.token);
    });
    this.errorMessages["INVALID_CONFIRM_TOKEN"] = "Invalid confirm token";
    this.errorMessages["CONFIRM_TOKEN_EXPIRED"] = "Confirm token was expired";
  }

  ngOnInit() {
    if ( this.token && this.token.length > 0) {
      this.token = this.token.replace('%3D', '=');
      console.log("this.token to be sent", this.token);
      let matSnackBarConfig = new MatSnackBarConfig();
      matSnackBarConfig.duration = 5000;
      this.authenticationService.confirmUser(this.token).subscribe(() => {
        this.isSuccess = true;
        this.snackBar.open("Your account is now confirmed", undefined, matSnackBarConfig);
      }, err => {
        console.log("error", err);
        if (err && err.error) {
          const error = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
          const errorKey = error.errors[0].errorCode;
          this.errorMessage = this.errorMessages[errorKey];
          this.snackBar.open(this.errorMessages[errorKey], undefined, matSnackBarConfig);
        } else {
          this.snackBar.open("Couldn't activate your account", undefined, matSnackBarConfig);
          this.errorMessage = "Couldn't activate your account";
        }
      });
    }
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
