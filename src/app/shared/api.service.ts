import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthResponse, ClientModel, User} from "./storage";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'http://localhost:8080/vabank-api/';
  constructor(private http: HttpClient) {}

  authorize(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.BASE_URL + 'authorize?username=' + username + '&password='+ password, {});
  }

  register(user: User) {
    /*{
      username: username,
        password: password,
      email: email,
      name: name,
      surname: surname
    }*/
    this.http.post(this.BASE_URL + 'register-user', user);
  }

  addClient(client: ClientModel) {
    return this.http.post(this.BASE_URL + 'clients', client);
  }

  getClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(this.BASE_URL + 'clients');
  }

  getClient(id: string | null): Observable<ClientModel> {
    return this.http.get<ClientModel>(this.BASE_URL + 'clients/' + id);
  }

  removeClient(clientKey: number | null) {
    return this.http.delete(this.BASE_URL + 'clients/' + clientKey);
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user-data');
  }
}
