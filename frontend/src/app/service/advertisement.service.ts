import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Advertisement} from "../models/advertisement";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  private advertisementURL: string = environment.mainURL + '/adv';

  constructor(private http: HttpClient) {

  }

  public getAll(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(this.advertisementURL + '/advertisements');
  }
  public save(advertisement: Advertisement) {
    return this.http.post<Advertisement>(this.advertisementURL + '/advertisements', advertisement);
  }

  getAdvertById(id: number): Observable<Advertisement> {
    return this.http.get<Advertisement>(`${this.advertisementURL}/advertisements/${id}`);
  }

  updateAdvert(id: number, advertisement: Advertisement): Observable<Object> {
    return this.http.put(`${this.advertisementURL}/advertisements/${id}`, advertisement);
  }

  deleteAdvert(id: number): Observable<Object>{
    return this.http.delete(`${this.advertisementURL}/advertisements/${id}`);
  }
}
