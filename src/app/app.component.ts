import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'socket-Angular';

  constructor(
    private router: Router
  ) {}

  ngOnInit(){
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/'])
  }
}
