import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersURL: string;

  constructor(private http: HttpClient) {
    this.usersURL = environment.mainURL + '/users';
  }

  // public getAll(): Observable<User[]> {
  //     return this.http.get<User[]>(this.usersURL);
  // }

  public getAll(): Observable<any> {
    if (this.isEmptyList()) {
      console.log("No users found")
      return this.http.get<User[]>(this.usersURL);
    } else {
      return this.http.get<User[]>(this.usersURL);
    }
  }

  isEmptyList(): boolean {
    if (this.http.get<User[]>(this.usersURL) == undefined) {
      return false;
    }
    return true;
  }

  create(user: object): Observable<Object> {
    return this.http.post(this.usersURL, user);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersURL, user);
  }
}
