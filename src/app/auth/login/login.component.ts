import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RegisterComponent} from "../register/register.component";
import {Storage, users} from "../../shared/storage";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {

  }

  loginForm: FormGroup<LoginInfo> = new FormGroup<LoginInfo>({
    username: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, RegisterComponent.usernameValidator]}),
    password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, RegisterComponent.passwordValidator]}),
  });

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  authorize() {
    console.log('authorizing user with username: ' + this.username.value)

    console.log('users size: ' + users.length)

    const foundUser = users.find(user => user.username === this.username.value);

    this.authService.login(this.username.value, this.password.value);

    if (foundUser !== null && foundUser?.password === this.password.value) {
      sessionStorage.setItem('username', this.username.value);
      sessionStorage.setItem('password', this.password.value);
    } else {
      window.alert('მომხმარებლის სახელი ან პაროლი არასწორია');
    }
    this.router.navigate(['/clients'])
  }
}

export interface LoginInfo {
  username: FormControl<string>;
  password: FormControl<string>;
}
