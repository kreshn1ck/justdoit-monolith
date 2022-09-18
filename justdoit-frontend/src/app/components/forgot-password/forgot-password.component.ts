import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;
  public email: FormControl;
  public isEmailSent: boolean;
  public isSendingEmail = false;

  public errorMessage: string = '';
  public errorMessages: { [key: string]: string } = {};

  constructor(private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar) {
    this.isEmailSent = false;
    this.email = new FormControl('', Validators.required);
    this.form = new FormGroup({
      emailControl: this.email
    });
    this.errorMessages["USER_CANNOT_SEND_REQUEST"] = "A recovery email has already been sent to your email";
    this.errorMessages["USER_INVALID_EMAIL_SUBMITTED"] = "You don't have an account with this email";
  }

  ngOnInit() {
  }

  recoverPassword(){
    this.isSendingEmail = true;
    this.authenticationService.forgotPassword(this.email.value).subscribe(() => {
      this.isEmailSent = true;
      this.isSendingEmail = false;
    }, err => {
      console.log("err", err);
      this.isSendingEmail = false;
      if (err && err.error) {
        const error = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
        const errorKey = error.errors[0].errorCode;
        this.errorMessage = this.errorMessages[errorKey];
      } else {
        this.errorMessage = 'Something went wrong';
      }
    });
  }

}
