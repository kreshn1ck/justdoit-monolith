import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {RegistrationRequest} from "../../services/todo-api/models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public username: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  public errorMessage: string = '';
  public subscription: Subscription;

  public isRegistering = false;
  public registered = false;

  public errorMessages: { [key: string]: string } = {};

  constructor(private snackBar: MatSnackBar,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.subscription = new Subscription();
    this.username = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.confirmPassword = new FormControl('', Validators.required);
    this.registerForm = new FormGroup({
      usernameControl: this.username,
      emailControl: this.email,
      passwordControl: this.password,
      confirmPasswordControl: this.confirmPassword,
    });
    this.errorMessages["EMAIL_ALREADY_EXISTS"] = "User with email already exists";
    this.errorMessages["USERNAME_ALREADY_EXISTS"] = "User with username already exists";
    this.errorMessages["CONFIRM_PASSWORD_DOES_NOT_MATCH"] = "Password and confirm password do not match";
  }

  ngOnInit(): void {
    this.subscription = this.registerForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    this.isRegistering = true;
    if (this.registerForm.valid) {
      const registrationRequest: RegistrationRequest = {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value,
        confirmPassword: this.confirmPassword.value
      };
      this.authenticationService.register(registrationRequest).subscribe(result => {
        this.isRegistering = false;
        this.registered = true;
        this.snackBar.open(`Registered successfully!
        We've sent an email to ${result.email}.
        Please confirm your email before you login.`);
      }, err => {
        this.isRegistering = false;
        this.snackBar.open(`Tf motherfucker Damn`);
        console.log("Register Error", err);
        if (err && err.error) {
          const error = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
          const errorKey = error.errors[0].errorCode;
          this.errorMessage = this.errorMessages[errorKey];
        } else {
          this.errorMessage = 'Could not register due to an error. Please try again';
        }
      });
    }
  }

}
