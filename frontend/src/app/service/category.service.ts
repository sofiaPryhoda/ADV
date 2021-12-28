import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private usersURL: string = environment.mainURL + '/categories';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.usersURL + '/all');
  }
}
