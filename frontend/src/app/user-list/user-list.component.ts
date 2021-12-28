import {Component} from '@angular/core';
import {UserService} from "../service/user-service.service";
import {User} from "../models/user";
import {Sort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];

  // sortedData: User[] = [];

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): User[] {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    });
    return this.users;
  }

  updateUser(id: number){
    this.router.navigate(['update-user', id]);
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.users = data;
      return;
    }

    this.users = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'surname':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: string | undefined, b: string | undefined, isAsc: boolean) {
  // @ts-ignore
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
