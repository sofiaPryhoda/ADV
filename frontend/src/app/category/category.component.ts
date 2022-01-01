import {Component, OnInit} from '@angular/core';
import {Category} from "../models/category";
import {CategoryService} from "../service/category.service";
import {User} from "../models/user";
import {UserService} from "../service/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  // categories: Category[] = [];
  //
  // constructor(private categoryService: CategoryService, private router: Router) {
  //
  // }
  ngOnInit(): void {
    // this.getCategories();
  }
  //
  // getCategories(): Category[] {
  //   this.categoryService.getAll().subscribe(data => {
  //     this.categories = data;
  //   });
  //   return this.categories;
  // }
}
