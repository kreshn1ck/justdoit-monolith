import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {RegistrationRequest} from "../../services/todo-api/models/registrationrequest.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResetPasswordRequest} from "../../services/todo-api/models";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit, OnDestroy {

  private token: string = "";
  private routeSubscription: Subscription;

  public resetPwForm: FormGroup;
  public password: FormControl;
  public email: FormControl;
  public confirmPassword: FormControl;
  public subscription: Subscription;

  public errorMessages: { [key: string]: string } = {};
  public errorMessage: string = '';
  public isTokenValid = false;
  public finished = false;
  public isProcessing = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar) {

    this.subscription = new Subscription();
    this.password = new FormControl('', Validators.required);
    this.confirmPassword = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.resetPwForm = new FormGroup({
      passwordControl: this.password,
      confirmPasswordControl: this.confirmPassword,
    });

    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const items: any = params;
      console.log(items);
      this.token = items.params.token;
      console.log("token", this.token);
    });
    this.errorMessages["INVALID_RESET_TOKEN"] = "Invalid reset token";
    this.errorMessages["RESET_TOKEN_EXPIRED"] = "Reset token was expired";
  }

  ngOnInit() {
    if (this.token && this.token.length > 0) {
      this.token = this.token.replace('%3D', '=');
      console.log("this.token to be sent", this.token);
      let matSnackBarConfig = new MatSnackBarConfig();
      matSnackBarConfig.duration = 5000;
      this.authenticationService.validateResetToken(this.token).subscribe(() => {
        this.isTokenValid = true;
        /*this.snackBar.open("Your account is now confirmed", undefined, matSnackBarConfig);*/
      }, err => {
        console.log("error", err);
        if (err && err.error) {
          const error = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
          const errorKey = error.errors[0].errorCode;
          this.errorMessage = this.errorMessages[errorKey];
          this.snackBar.open(this.errorMessages[errorKey], undefined, matSnackBarConfig);
        } else {
          this.snackBar.open("Cannot use this link to reset password", undefined, matSnackBarConfig);
          this.errorMessage = "Couldn't reset your password";
        }
      });
    }
  }

  submit() {
    this.isProcessing = true;
    if (this.resetPwForm.valid) {
      const resetPasswordRequest: ResetPasswordRequest = {
        password: this.password.value,
        confirmPassword: this.confirmPassword.value,
        email: this.email.value
      };
      this.authenticationService.resetToken(resetPasswordRequest, this.token).subscribe(result => {
        this.isProcessing = false;
        this.finished= true;
        this.snackBar.open(`New Password was set successfully!
        You can go to login now`);
      }, err => {
        this.isProcessing = false;
        this.snackBar.open(`Could not change password`);
        console.log("Register Error", err);
        if (err && err.error) {
          const error = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
          const errorKey = error.errors[0].errorCode;
          this.errorMessage = this.errorMessages[errorKey];
        } else {
          this.errorMessage = 'Could not change password due to an error. Please try again';
        }
      });
    }
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
