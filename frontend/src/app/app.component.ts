import {Component} from '@angular/core';
import {Category} from "./models/category";
import {Router} from "@angular/router";
import {CategoryService} from "./service/category.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {

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
