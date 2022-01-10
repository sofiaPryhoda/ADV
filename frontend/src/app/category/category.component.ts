import {Component, OnInit} from '@angular/core';
import {Category} from "../models/category";
import {CategoryService} from "../service/category.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateDialogComponent} from "../update-dialog/update-dialog.component";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  closeResult!: string;
  fileNameDialogRef!: MatDialogRef<UpdateDialogComponent>;
  editForm!: FormGroup;

  constructor(private categoryService: CategoryService,
              private router: Router, private dialog: MatDialog,
              private modalService: NgbModal, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getCategories();
    this.editForm = this.fb.group({
      id: [''],
      "name": ['']
    });

    // this.editForm = new FormGroup({
    //   id: new FormControl('', Validators.required),
    //   name: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(128),
    //     Validators.pattern("[a-zA-Z]+")])
    // });
  }

  getCategories(): Category[] {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
    return this.categories;
  }

  deleteUser(id: number) {
    this.categoryService.deleteCategory(id).subscribe(data => {
      this.getCategories();
    })
  }

  removeUser(categoryObj: Category) {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Profile deletion',
        message: categoryObj.name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.categories = this.categories.filter(item => item.id !== categoryObj.id);
        this.deleteUser(categoryObj.id!);
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

  onSubmit(f: NgForm) {
    this.categoryService.save(f.value).subscribe(result => this.gotoCategoryList());
    this.ngOnInit();
    this.modalService.dismissAll();
  }

  gotoCategoryList() {
    this.router.navigate(['/categories']);
  }

  openEdit(targetModal: any, category: Category) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: category.id,
      name: category.name
    });
  }

  onSave() {
    this.categoryService.updateCategory(this.editForm.value.id, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  submit() {
    console.log(this.editForm);
  }
}
