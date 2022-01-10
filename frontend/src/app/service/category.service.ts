import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryURL: string = environment.mainURL + '/adv';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryURL + '/categories');
  }

  deleteCategory(id: number): Observable<Object> {
    return this.http.delete(`${this.categoryURL}/categories/${id}`);
  }

  updateCategory(id: number, category: Category): Observable<Object> {
    return this.http.put(`${this.categoryURL}/categories/${id}`, category);
  }

  public save(category: Category) {
    return this.http.post<User>(this.categoryURL + '/categories', category);
  }
}
