import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'socket-Angular';

  constructor(
    private router: Router,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/']);
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }

      });

    }

  }
}
