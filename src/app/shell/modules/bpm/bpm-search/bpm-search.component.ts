import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Storage, User, users} from "../../../../shared/storage";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bpm-search',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './bpm-search.component.html',
  styleUrl: './bpm-search.component.scss'
})
export class BpmSearchComponent {

  constructor(private router: Router) {

  }


  usersList = users;
  filter = {
    name: '',
    surname: '',
    clientKey: ''
  };

  search(): void {

    // const nameFilter = changes['name'].currentValue;
    // const surnameFilter = changes['surname'].currentValue;
    // const clientKeyFilter = changes['clientKey'].currentValue;

    console.log('filtering with: ' + this.filter.name + this.filter.surname + this.filter.clientKey);

    this.usersList = users.filter(user => (this.filter.name !== '' && user.name.includes(this.filter.name))
      || (this.filter.surname !== '' && user.surname.includes(this.filter.surname))
      || (this.filter.clientKey !== '' && user.clientKey.toString().includes(this.filter.clientKey)));

    console.log(this.usersList.length)
  }

  selectUser(user: User) {
    console.log("redirecting to the user page for user: " + user.username)
    this.router.navigate(['/client/' + user.clientKey])
  }
}
