import {Component, Input} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiService} from "../../shared/api.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input()
  username: string = '';

  private apiService: ApiService;

  constructor(private router: Router, private http: HttpClient) {
    this.apiService = new ApiService(http);
  }

  logout() {
    this.apiService.logout();
  }
}
