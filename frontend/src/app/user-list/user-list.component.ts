import {Component} from '@angular/core';
import {UserService} from "../service/user-service.service";
import {User} from "../models/user";
import {Sort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
// import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): User[] {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    });
    return this.users;
  }

  userDetails(id: number) {
    this.router.navigate(['users', id]);
  }

  updateUser(id: number) {
    this.router.navigate(['updateuser', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.getUsers();
    })
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

  // @ts-ignore
  removeUser(userObj) {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Profile deletion',
        message: userObj.name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.users = this.users.filter(item => item.id !== userObj.id);
        this.deleteUser(userObj.id);
      }
    });
  }
}

/* removeEmployee(employeeObj) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Employee',
        message: 'Are you sure, you want to remove an employee: ' + employeeObj.Name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.employeeList = this.employeeList.filter(item => item.employeeId !== employeeObj.employeeId);
      }
    });
  }*/
function compare(a: string | undefined, b: string | undefined, isAsc: boolean) {
  // @ts-ignore
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
