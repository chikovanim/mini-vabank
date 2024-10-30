import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../../shared/api.service";
import {ClientModel} from "../../../../shared/storage";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-bpm-search',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './bpm-search.component.html',
  styleUrl: './bpm-search.component.scss'
})
export class BpmSearchComponent implements OnInit {

  private apiService: ApiService;

  constructor(private router: Router, private http: HttpClient) {
    this.apiService = new ApiService(http);
  }

  clientList: ClientModel[]= [];
  clientsToShow: ClientModel[]= [];

  filter = {
    name: '',
    surname: '',
    clientKey: ''
  };

  ngOnInit(): void {
    this.refreshClients();
    this.clientsToShow = this.clientList;
  }

  search(): void {

    // const nameFilter = changes['name'].currentValue;
    // const surnameFilter = changes['surname'].currentValue;
    // const clientKeyFilter = changes['clientKey'].currentValue;

    console.log('filtering with: ' + this.filter.name + this.filter.surname + this.filter.clientKey);

    if (this.filter.name === '' && this.filter.surname === '' && this.filter.clientKey === '') {
      this.clientsToShow = this.clientList;
      return;
    }

    this.clientsToShow = this.clientList.filter(client =>
      (this.filter.name === '' || client.name.toLowerCase().includes(this.filter.name.toLowerCase()))
      && (this.filter.surname === '' || client.surname.toLowerCase().includes(this.filter.surname.toLowerCase()))
      && (this.filter.clientKey === '' || client.clientKey.toString().includes(this.filter.clientKey)));

    console.log(this.clientList.length)
  }

  selectUser(client: ClientModel) {
    console.log("redirecting to the user page for user: " + client.username)
    this.router.navigate(['/clients/' + client.clientKey])
  }

  refreshClients() {
    this.apiService.getClients().subscribe((data: ClientModel[]) => {
      this.clientList = data;
    });
  }

  addClient() {
    this.router.navigate(['/client/new'])
  }
}
