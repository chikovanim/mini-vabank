import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientModel} from "../../../../shared/storage";
import {ApiService} from "../../../../shared/api.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {

  private apiService: ApiService;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.apiService = new ApiService(http);
  }

  selectedClient: ClientModel = {name: '', surname: '', clientKey: 0, username: '', address: '', phone: '', birthDate: '',
    city: '', country: '', email: '', postalCode: ''};

  ngOnInit(): void {

    const clientKey = this.route.snapshot.paramMap.get('id');

    this.apiService.getClient(clientKey).subscribe((data: ClientModel) => {
      this.selectedClient = data;
    });
  }
}
