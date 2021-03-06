import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user-service.service";
import {User} from "../models/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    });
  }

  public byNameASC() {
    this.userService.byNameDESC().subscribe(data => {
      this.users = data;
    });
  }

  public byNameDESC() {
    this.userService.byNameDESC().subscribe(data => {
      this.users = data;
    });
  }
}
