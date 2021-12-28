import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersURL: string = environment.mainURL;

  constructor(private http: HttpClient) {

  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL + '/users');
  }

  public save(user: User) {
    return this.http.post<User>(this.usersURL + '/add', user);
  }

  getUser(id: number | undefined): Observable<any> {
    return this.http.get(`${this.usersURL}/${id}`);
  }

  update(id: any, user: User): Observable<Object> {
    this.usersURL += this.usersURL + '/update-user';
    return this.http.put(`${this.usersURL}/${id}`, user);
  }
}
