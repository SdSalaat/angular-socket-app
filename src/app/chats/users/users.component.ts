import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../services/shared/shared.service';
import {Socket} from 'ngx-socket-io';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  user: any = {};
  searchValue = '';
  @Output() passUser = new EventEmitter();


  constructor(
    private sharedService: SharedService,
    private socket: Socket,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.sharedService.getUsers().length > 0) {
      this.users = this.sharedService.getUsers();
    }
    this.socket.on('all-users', (users) => {
      const activeUser = JSON.parse(localStorage.getItem('activeUser'));
      const filteredUsers = users.filter((user) => {
        return user._id !== activeUser._id;
      });
      this.sharedService.setUsers(filteredUsers);
      this.users = filteredUsers;
    })
    this.socket.on('logged-out', (data) => {
      if (data) {
        localStorage.setItem('activeUser', JSON.stringify({}));
        localStorage.setItem('active', JSON.stringify({active: false}));
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/']);
      }
    });
  }

  initializeItems() {
    if (this.sharedService.getUsers().length > 0) {
      this.users = this.sharedService.getUsers();
    }
  }

  selectUser(user) {
    this.user = user;
    this.passUser.emit(this.user);
  }

  logOutUser() {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    this.socket.emit('logout-user', activeUser);
  }


  filterUsers() {
    this.initializeItems();
    const val = this.searchValue;
    if (val && val.trim() !== '') {
      this.users = this.users.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
}
