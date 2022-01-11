import {Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';
import {UserService} from "../service/user-service.service";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {VERSION} from "@angular/material/core";
import {UpdateDialogComponent} from "../update-dialog/update-dialog.component";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


export type SortColumn = keyof User | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {'asc': 'desc', 'desc': '', '': 'asc'};

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
  closeResult!: string;
  editForm!: FormGroup;
  addForm!: NgForm;
  version = VERSION;
  page = 1;
  count = 0;
  tableSize = 4;
  tableSizes = [4, 6, 8, 12];
  fileNameDialogRef!: MatDialogRef<UpdateDialogComponent>;
  searchText: any;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | undefined;

  constructor(private userService: UserService, private router: Router,
              private fb: FormBuilder, private httpClient: HttpClient,
              private dialog: MatDialog, private modalService: NgbModal) {
  }

  onSort({column, direction}: SortEvent) {

    this.headers!.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {
      this.users;
    } else {
      this.users.sort((a, b) => {
        const res = compare(a[column]!, b[column]!);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  submit() {
    console.log(this.editForm);
  }

  ngOnInit() {
    this.getUsers();
    this.editForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(128),
        Validators.pattern("([A-Z][a-zA-Z]*)")]),

      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(128),
        Validators.pattern("([A-Z][a-zA-Z]*)")]),

      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl("",
        [
          Validators.required,
          Validators.pattern("((\\+38)?\\(?\\d{3}\\)?[\\s\\.-]?(\\d{7}|\\d{3}[\\s\\.-]\\d{2}[\\s\\.-]\\d{2}|\\d{3}-\\d{4}))"),
          Validators.minLength(13),
          Validators.maxLength(13)])
    });
  }

  openEdit(targetModal: any, user: User) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone
    });
  }

  onSave() {
    this.userService.updateUser(this.editForm.value.id, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
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

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.getUsers();
    })
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

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // onSubmit(f: NgForm) {
  //   this.userService.save(f.value).subscribe(result => this.gotoUserList());
  //   this.getUsers();
  //   this.modalService.dismissAll();
  // }

  gotoUserList() {
    this.router.navigate(['/users']);
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getUsers();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUsers();
  }

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(128),
      Validators.pattern("([A-Z][a-zA-Z]*)")]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(128),
      Validators.pattern("([A-Z][a-zA-Z]*)")]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl("",
      [
        Validators.required,
        Validators.pattern("((\\+38)?\\(?\\d{3}\\)?[\\s\\.-]?(\\d{7}|\\d{3}[\\s\\.-]\\d{2}[\\s\\.-]\\d{2}|\\d{3}-\\d{4}))"),
        Validators.minLength(13),
        Validators.maxLength(13)])
  });

  onSubmit(): void {
    this.userService.save(this.form.value).subscribe(result => this.gotoUserList());
    this.gotoUserList();
    this.modalService.dismissAll();
  }
}

