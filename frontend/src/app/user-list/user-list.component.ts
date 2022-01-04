import {Component} from '@angular/core';
import {UserService} from "../service/user-service.service";
import {User} from "../models/user";
import {Sort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {VERSION} from "@angular/material/core";
import {UpdateDialogComponent} from "../update-dialog/update-dialog.component";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
  closeResult!: string;
  editForm!: FormGroup;
  version = VERSION;

  fileNameDialogRef!: MatDialogRef<UpdateDialogComponent>;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private httpClient: HttpClient, private dialog: MatDialog, private modalService: NgbModal) {
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

  userDetails(id: number) {
    this.router.navigate(['users', id]);
  }

  updateUser(id: number) {
    this.router.navigate(['users', id]);
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

  removeUser(userObj: User) {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Profile deletion',
        message: userObj.name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.users = this.users.filter(item => item.id !== userObj.id);
        this.deleteUser(userObj.id!);
      }
    });
  }

  // @ts-ignore
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
// @ts-ignore
  private getDismissReason(reason): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    this.userService.save(f.value).subscribe(result => this.gotoUserList());
    this.getUsers();
    this.modalService.dismissAll();
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}

function compare(a: string | undefined, b: string | undefined, isAsc: boolean) {
  // @ts-ignore
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
