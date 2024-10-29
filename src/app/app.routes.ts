import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {LoginGuard} from "./login.guard";
import {RegisterComponent} from "./auth/register/register.component";
import {BpmSearchComponent} from "./shell/modules/bpm/bpm-search/bpm-search.component";
import {ShellGuard} from "./shell.guard";
import {UserInfoComponent} from "./shell/modules/bpm/user-info/user-info.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    // loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
    canActivate: [LoginGuard]
  },
  {
    path: 'registration',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'clients',
    component: BpmSearchComponent,
    canActivate: [ShellGuard]
  },
  {
    path: 'client/:id',
    component: UserInfoComponent,
    canActivate: [ShellGuard]
  }
];
