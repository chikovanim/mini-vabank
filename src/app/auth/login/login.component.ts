import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RegisterComponent} from "../register/register.component";
import {AuthResponse} from "../../shared/storage";
import {ApiService} from "../../shared/api.service";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private apiService: ApiService;

  constructor(private router: Router, private http: HttpClient) {
    this.apiService = new ApiService(http);
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

    this.apiService.authorize(this.username.value, this.password.value).subscribe((response: AuthResponse) => {

      if (response.success) {
        sessionStorage.setItem('username', this.username.value);
        sessionStorage.setItem('user-data', JSON.stringify(response.user));

        this.router.navigate(['/clients'])
      } else {
        window.alert('მომხმარებლის სახელი ან პაროლი არასწორია');
      }
    });
  }
}

export interface LoginInfo {
  username: FormControl<string>;
  password: FormControl<string>;
}
