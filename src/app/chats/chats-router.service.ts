import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataService} from "../services/data/data.service";

@Injectable({
  providedIn: 'root'
})
export class ChatsRouterService {

  constructor(
    private httpService: DataService
  ) { }

  public userChats(data, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpService.post<any>(`/api/get/chats`, data, params);
  }
}
