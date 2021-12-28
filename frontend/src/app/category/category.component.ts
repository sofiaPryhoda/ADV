import {Component, OnInit} from '@angular/core';
import {Category} from "../models/category";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): Category[] {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
    return this.categories;
  }
}
