import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent implements OnInit {

  username: string = '';

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') ?? '';

    console.log('logged in user\'s username: ' + this.username);
  }

}
