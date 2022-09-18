import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HandleErrorService } from './services/handleError/handle-error.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { LoginLayoutComponent } from './components/layout/login-layout/login-layout.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorInterceptor } from "./interceptor/error.interceptors";
import { RegisterComponent } from './components/register/register.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from '@angular/material/button';
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { UserConfirmationComponent } from "./components/user-confirmation/user-confirmation.component";
import { FriendsComponent } from './components/friends/friends.component';
import { MaterialModule } from './material/material.module';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { SwiperModule } from 'swiper/angular';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import { RecoverPasswordComponent } from "./components/recover-password/recover-password.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UserConfirmationComponent,
    FriendsComponent,
    CreateTodoComponent,
    AddFriendComponent,
    EditTodoComponent,
    MyDashboardComponent,
    RecoverPasswordComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MaterialModule,
    SwiperModule
  ],
  providers: [
    HandleErrorService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
