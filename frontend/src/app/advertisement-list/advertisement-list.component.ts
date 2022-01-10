import {Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {AdvertisementService} from "../service/advertisement.service";
import {Advertisement} from "../models/advertisement";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AdvertDetailPopupComponent} from "../advert-detail-popup/advert-detail-popup.component";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {User} from "../models/user";
import {Category} from "../models/category";
import {CategoryService} from "../service/category.service";
import {UserService} from "../service/user-service.service";
import {NgbdSortableHeader} from "../user-list/user-list.component";



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
export class NgbdSortableHeader2 {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}



@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {

  advertisements: Advertisement[] = [];
  users: User[] = [];
  categories: Category[] = [];
  page = 1;
  count = 0;
  tableSize = 3;
  tableSizes = [3, 6, 9, 12];
  closeResult!: string;
  searchText: any;
  editForm!: FormGroup;
  @ViewChildren(NgbdSortableHeader2) headers: QueryList<NgbdSortableHeader2> | undefined;
  constructor(private advertisementService: AdvertisementService,
              private router: Router, public dialog: MatDialog,
              private modalService: NgbModal,
              private categoryService: CategoryService,
              private userService: UserService,
              private fb: FormBuilder) {
  }

  openDialog() {
    this.dialog.open(AdvertDetailPopupComponent);
  }

  openDetails(targetModal: any, advert: Advertisement) {
    this.modalService.open(targetModal, {
      centered: true,
      windowClass: 'my-class',
      size: 'lg'

    });

    // @ts-ignore
    document.getElementById('name').setAttribute('value', advert.name);
    // @ts-ignore
    document.getElementById('description').setAttribute('value', advert.description);
    // @ts-ignore
    document.getElementById('category').setAttribute('value', advert.category?.name);
    // @ts-ignore
    document.getElementById('user').setAttribute('value', advert.user?.name);
    // @ts-ignore
    document.getElementById('creationDate').setAttribute('value', advert.creationDate);
  }

  ngOnInit() {
    this.getAdverts();
    this.getCategories();
    this.getUsers();
    // this.editForm = new FormGroup({
    //   id: new FormControl('', Validators.required),
    //   name: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(128),
    //     Validators.pattern("[a-zA-Z]+")]),
    //
    //   description: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(128),
    //     Validators.pattern("[a-zA-Z]+")])
    // });

    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      user: [''],
      category: ['']
    });
  }

  getAdverts(): Advertisement[] {
    this.advertisementService.getAll().subscribe(data => {
      this.advertisements = data;
    });
    return this.advertisements;
  }

  deleteAdvert(id: number) {
    this.advertisementService.deleteAdvert(id).subscribe(data => {
      this.getAdverts();
    })
  }

  removeAdvert(advertObj: Advertisement) {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Profile deletion',
        message: advertObj.name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.advertisements = this.advertisements.filter(item => item.id !== advertObj.id);
        this.deleteAdvert(advertObj.id!);
      }
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAdverts();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAdverts();
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

  onSubmit(f: NgForm) {
    this.advertisementService.save(f.value).subscribe(result => this.gotoAdvertList());
    this.getAdverts();
    this.modalService.dismissAll();
  }

  gotoAdvertList() {
    this.router.navigate(['/advertisements']);
  }

  getCategories(): Category[] {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
    return this.categories;
  }

  getUsers(): User[] {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    });
    return this.users;
  }

  submit() {
    console.log(this.editForm);
  }

  openEdit(targetModal: any, advertisement: Advertisement) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: advertisement.id,
      name: advertisement.name,
      description: advertisement.description,
      user: advertisement.user,
      category: advertisement.category
    });
  }

  onSave() {
    this.advertisementService.updateAdvert(this.editForm.value.id, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  onSort({column, direction}: SortEvent) {

    this.headers!.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {
      this.advertisements;
    } else {
      this.advertisements.sort((a, b) => {
        // @ts-ignore
        const res = compare(a[column]!, b[column]!);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}


