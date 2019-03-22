import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataService} from "../services/data/data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRouterService {

  constructor(
    private httpService: DataService
  ) { }

  public userLogin(data, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpService.post<any>(`/api/user/login`, data, params);
  }

  public registerUser(data, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpService.post<any>(`/api/user/register`, data, params);
  }

}
