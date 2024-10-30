import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../shared/storage";
import {ApiService} from "../../shared/api.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private apiService: ApiService;

  constructor(private router: Router, private http: HttpClient) {
    this.apiService = new ApiService(http);
  }

  public static usernameValidator: ValidatorFn = (control) => {
    if (control.value === null) {
      return {required: true, message: 'აუცილებელი ველი'};
    }
    if (control.value === '') {
      return {required: true, message: 'აუცილებელი ველი'};
    }
    if (control.value.includes(' ')) {
      return {noSpaces: true, message: 'მომხმარებლის სახელი არ უნდა შეიცავდეს სფეისებს'};
    }
    if (control.value.length < 3) {
      return {tooShort: true, message: 'მომხმარებლის სახელი უნდა შეიცავდეს 2-ზე მეტ სიმბოლოს'};
    }
    if (control.value.length > 30) {
      return {tooLong: true, message: 'მომხმარებლის სახელი არ უნდა შეიცავდეს 30-ზე მეტ სიმბოლოს'};
    }
    return null;
  }

  public nameValidator: ValidatorFn = (control) => {
    if (control.value === null) {
      return {required: true, message: 'აუცილებელი ველი'};
    }
    if (control.value === '') {
      return {required: true, message: 'აუცილებელი ველი'};
    }
    if (control.value.length < 3) {
      return {tooShort: true, message: 'სახელი უნდა შეიცავდეს 2-ზე მეტ სიმბოლოს'};
    }
    if (control.value.length > 30) {
      return {tooLong: true, message: 'სახელი არ უნდა შეიცავდეს 30-ზე მეტ სიმბოლოს'};
    }
    return null;
  }

  public static passwordValidator: ValidatorFn = (control) => {
    if (control.value === null) {
      return {required: true, message: 'აუცილებელი ველი'};
    }
    if (control.value === '') {
      return {required: true, message: 'აუცილებელი ველი'};
    }
    if (control.value.length < 3) {
      return {tooShort: true, message: 'პაროლი უნდა შეიცავდეს 2-ზე მეტ სიმბოლოს'};
    }
    if (control.value.length > 30) {
      return {tooLong: true, message: 'პაროლი არ უნდა შეიცავდეს 30-ზე მეტ სიმბოლოს'};
    }
    return null;
  };

  confirmPasswordValidator: ValidatorFn = (control) => {
    if (control.value === null) {
      return null;
    }
    if (control.value === '') {
      return null;
    }
    if (this.confirmPassword.touched && this.confirmPassword.value !== this.password.value) {
      return {tooShort: true, message: 'პაროლები არ ემთხვევა'};
    }

    return null;
  };

  registrationForm: FormGroup<RegistrationInfo> = new FormGroup<RegistrationInfo>({
      username: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, RegisterComponent.usernameValidator]
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, RegisterComponent.passwordValidator, this.confirmPasswordValidator,]
      }),
      confirmPassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, this.confirmPasswordValidator, RegisterComponent.passwordValidator]
      }),
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, this.nameValidator]
      }),
    }
  )

  get username() {
    return this.registrationForm.controls.username;
  }

  get password() {
    return this.registrationForm.controls.password;
  }

  get confirmPassword() {
    return this.registrationForm.controls.confirmPassword;
  }

  get name() {
    return this.registrationForm.controls.name;
  }

  onSubmit() {
    console.log('on submit called')

    const newUser: User = {
      name: this.name.value.split(" ")[0],
      username: this.username.value,
      surname: this.name.value.split(" ").length > 1 ? this.name.value.split(" ")[1] : this.name.value.split(" ")[0],
      password: this.password.value,
      email: this.username.value + '@bog.ge',
      created: new Date(),
    };
    console.log('registering user: ' + JSON.stringify(newUser));

    this.apiService.register(newUser);

    this.router.navigate(['/login'])
  }}


export interface RegistrationInfo {
  name: FormControl<string>
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
