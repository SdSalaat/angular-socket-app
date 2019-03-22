import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  users: any[] = [];

  constructor() { }

  setUsers(users) {
    this.users = users
  }

  getUsers() {
    return this.users;
  }
}
