import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SwPush, SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'socket-Angular';

  constructor(
    private router: Router,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
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

    this.swPush.notificationClicks.subscribe( notpayload => {
      console.log(
        'Action: ' + notpayload.action +
        'Notification data: ' + notpayload.notification.data +
        'Notification data.url: ' + notpayload.notification.data.url +
        'Notification data.body: ' + notpayload.notification.body
      );
    });
  }
}


// on build line:2096 of ngsw-worker.js
// this.scope.addEventListener('notificationclick', (event) => {
//   event.notification.close();
//   if (clients.openWindow && event.notification.data.url) {
//     event.waitUntil(clients.openWindow(event.notification.data.url));
//   }
// });
