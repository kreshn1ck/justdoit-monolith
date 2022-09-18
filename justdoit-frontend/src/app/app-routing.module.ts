import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginLayoutComponent } from './components/layout/login-layout/login-layout.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { NoUserGuard } from './guards/noUser.guard';
import { UserGuard } from './guards/user.guard';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserConfirmationComponent } from './components/user-confirmation/user-confirmation.component';
import { FriendsComponent } from './components/friends/friends.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import {ResetPasswordRequest} from "./services/todo-api/models";
import {RecoverPasswordComponent} from "./components/recover-password/recover-password.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginLayoutComponent,
    canActivate: [NoUserGuard],
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'register',
    component: LoginLayoutComponent,
    canActivate: [NoUserGuard],
    children: [{ path: '', component: RegisterComponent }],
  },
  {
    path: 'forgot-password',
    component: LoginLayoutComponent,
    canActivate: [NoUserGuard],
    children: [{ path: '', component: ForgotPasswordComponent }],
  },
  {
    path: 'reset-password/:token',
    component: LoginLayoutComponent,
    canActivate: [NoUserGuard],
    children: [{ path: '', component: RecoverPasswordComponent }],
  },
  {
    path: 'user-confirmation/:token',
    component: LoginLayoutComponent,
    canActivate: [NoUserGuard],
    children: [{ path: '', component: UserConfirmationComponent }],
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [UserGuard],
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'my-dashboard',
    component: MainLayoutComponent,
    canActivate: [UserGuard],
    children: [{ path: '', component: MyDashboardComponent }],
  },
  {
    path: 'friends',
    component: MainLayoutComponent,
    canActivate: [UserGuard],
    children: [{ path: '', component: FriendsComponent }],
  },
  {
    path: 'create-todo',
    component: MainLayoutComponent,
    canActivate: [UserGuard],
    children: [{ path: '', component: CreateTodoComponent }],
  },
  {
    path: 'friends',
    component: MainLayoutComponent,
    canActivate: [UserGuard],
    children: [{ path: '', component: FriendsComponent }],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
