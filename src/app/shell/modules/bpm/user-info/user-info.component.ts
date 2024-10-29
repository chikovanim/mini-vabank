import {Component, OnInit} from '@angular/core';
import {User, users} from "../../../../shared/storage";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {

  }
  selectedUser: User = {clientKey: 0, created: new Date(), name: "", password: "", surname: "", username: ""};

  ngOnInit(): void {

    const clientKey = this.route.snapshot.paramMap.get('id');

    this.selectedUser = users.filter(u => u.clientKey.toString() === clientKey)[0];
  }
}
