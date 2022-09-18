import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserAuthenticationRequest} from 'src/app/models/user';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {ErrorHandlingUtil} from "../../services/error-handling.util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public authenticationRequest: UserAuthenticationRequest = { password: '', username: '' };
  public loginForm: FormGroup;
  public username: FormControl;
  public password: FormControl;
  public errorMessage: string = '';
  public subscription: Subscription;

  public isLoggingIn = false;

  public errorMessages: { [key: string]: string } = {};

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.subscription = new Subscription();
    //this.login(this.user);
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      usernameControl: this.username,
      passwordControl: this.password,
    });
    this.errorMessages["BAD_CREDENTIALS"] = "Username or password incorrect";
    this.errorMessages["USER_NOT_CONFIRMED"] = "Please confirm your email first";
  }

  ngOnInit(): void {
    this.subscription = this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async submit() {
    if (this.loginForm.valid) {
      const userAuthenticationRequest: UserAuthenticationRequest = {
        username: this.username.value,
        password: this.password.value,
      };
      this.doLogin(userAuthenticationRequest);
    }
  }

  private doLogin(userAuthenticationRequest: UserAuthenticationRequest): void {
    this.isLoggingIn = true;
    this.authenticationService.login(userAuthenticationRequest).subscribe((result) => {
      this.isLoggingIn = false;
      this.authenticationService.addUserInfoToLocalStorage(result, result.userId, result.username);
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log("err", err);
      this.isLoggingIn = false;
      const errorKey = ErrorHandlingUtil.getErrorKey(err);
      this.errorMessage = errorKey === undefined ? 'Username or password incorrect' : this.errorMessages[errorKey];
    });
  }
}
