import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ApiService} from "../../../../../shared/api.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {

  private apiService: ApiService;

  constructor(private router: Router, private http: HttpClient) {
    this.apiService = new ApiService(http);
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

  clientRegistrationForm: FormGroup<RegisterClientInfo> = new FormGroup<RegisterClientInfo>({
      surname: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, this.nameValidator]
      }),
      plus: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)]
      }),
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, this.nameValidator]
      }),
    }
  );

  get name() {
    return this.clientRegistrationForm.controls.name;
  }
  get surname() {
    return this.clientRegistrationForm.controls.surname;
  }
  get plusPoints() {
    return this.clientRegistrationForm.controls.plus;
  }

  onSubmit() {
    console.log('adding client')
    this.apiService.addClient({
      "name": this.name.value,
      "surname": this.surname.value,
      "plusPoints": this.plusPoints.value,
      "clientKey": null,
      "username": null,
      "email": this.surname.value + '@gmail.com',
      "phone": null,
      "address": null,
      "city": null,
      "country": null,
      "postalCode": null,
      "birthDate": null,
    }).subscribe((data: any) => {

      console.log('Client added successfully with clientKey:', data);
      this.router.navigate(['/clients']);

    });
  }
}

export interface RegisterClientInfo {
  name: FormControl<string>
  surname: FormControl<string>;
  plus: FormControl<number>;
}
