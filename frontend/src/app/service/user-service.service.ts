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

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersURL}/users/${id}`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this.http.put(`${this.usersURL}/updateuser/${id}`, user);
  }

  deleteUser(id: number): Observable<Object>{
    return this.http.delete(`${this.usersURL}/userdelete/${id}`);
  }
}
