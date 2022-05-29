import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private readonly GENERAL = '/auth/public/v1/auth';
  private readonly CARD = '/auth/public/v1/card';
  private readonly PEBBLE = '/auth/public/v1/auth/pebble';

  constructor(private _http: HttpClient) { }

  getAllCardsByUser(id): Observable<any> {
    return this._http.get(`${this.GENERAL}/report/by-user/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this._http.get(`${this.GENERAL}/users`);
  }

  getAllCards(): Observable<any> {
    return this._http.get(`${this.GENERAL}/cards`);
  }

  saveCard(card): Observable<any> {
    return this._http.post(`${this.CARD}/create`, card, {responseType: 'json'});
  }

  changeStatus(id, status): Observable<any> {
    return this._http.put(`${this.CARD}/status?id=${id}&status=${status}`, null);
  }

  deleteCard(id): Observable<any> {
    return this._http.delete(`${this.CARD}/cards/`+ id);
  }

  getAllReportsById(id, params): Observable<any> {
    return this._http.get<any[]>(this.CARD + `/reports/${id}?` + params);
  }
  public getPDF(id): Observable<Blob> {
    return this._http.get(this.PEBBLE + `/by-user/${id}`, { responseType: 'blob' });
  }
}
