import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) { }


  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.httpClient
      .get(`${environment.baseURL}${url}`, { params })
      .pipe(map(response => <T>response));
  }

  post<T>(url: string, body?: any, params?: HttpParams): Observable<T> {
    return this.httpClient
      .post(`${environment.baseURL}${url}`, body, { params })
      .pipe(map(response => <T>response));
  }
}
