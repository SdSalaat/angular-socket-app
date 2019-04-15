import {Component, OnInit} from '@angular/core';
import jQuery from 'jquery';
import {Router} from '@angular/router';
import {AuthRouterService} from '../auth-router.service';
import {Socket} from 'ngx-socket-io';
import {SharedService} from '../../services/shared/shared.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {SwPush, SwUpdate} from '@angular/service-worker';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userDetails: any = {
    email: '',
    password: ''
  };
  isError = false;
  errorMessage = '';

  constructor(
    public router: Router,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private socket: Socket,
    private authRoute: AuthRouterService,
    private sharedService: SharedService,
    private ngxService: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    (($) => {
      'use strict';


      /*==================================================================
      [ Validate ]*/
      const input = $('.validate-input .input100');

      $('.validate-form').on('submit', () => {
        let check = true;

        for (const userInput of input) {
          if (validate(userInput) === false) {
            showValidate(userInput);
            check = false;
          }
        }

        if (check) {
          this.userLogin();
          check = false;
          return check;
        } else {
          return check;
        }
      });


      $('.validate-form .input100').each(function() {
        $(this).focus(function() {
          hideValidate(this);
        });
      });

      function validate(userInput) {
        if ($(userInput).attr('type') === 'email' || $(userInput).attr('name') === 'email') {
          if ($(userInput).val()
              .trim()
              .match(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(]?)$/)
            == null) {
            return false;
          }
        } else {
          if ($(userInput).val().trim() === '') {
            return false;
          }
        }
      }

      function showValidate(userInput) {
        const thisAlert = $(userInput).parent();

        $(thisAlert).addClass('alert-validate');
      }

      function hideValidate(userInput) {
        const thisAlert = $(userInput).parent();

        $(thisAlert).removeClass('alert-validate');
      }
    })(jQuery);

    this.socket.on('validated-user', users => {
      if (users.length > 0) {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        const filteredUsers = users.filter((user) => {
          return user._id !== activeUser._id;
        });
        this.sharedService.setUsers(filteredUsers);
      }
      this.ngxService.stop('');
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/chats/users']);
    });

    this.ngxService.start('');
    const activeUSer = JSON.parse(localStorage.getItem('activeUser'));
    const active = JSON.parse(localStorage.getItem('active'));
    if (activeUSer !== null && active !== null) {
      if (Object.keys(activeUSer).length > 0 && active.active === true) {
        this.socket.emit('validate-user');
      }
    } else {
      this.ngxService.stop('');
    }
  }

  userLogin() {
    this.ngxService.start('login');
    // push Notify
    if (this.swUpdate.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: 'BKZ7q9GnaavKPUheKO8TkBHgRglEA1sYZtjs05Y45scAoTRVMelVj5qTddqTfF48V_JcxYL1scOT_WA9GyWhAes'
      })
        .then(sub => {
          console.log(sub);
          this.userDetails.sub = sub;
          this.authRoute.userLogin(this.userDetails)
            .subscribe(data => {
              localStorage.setItem('activeUser', JSON.stringify(data.data));
              localStorage.setItem('active', JSON.stringify({active: true}));
              this.ngxService.stop('login');
              this.socket.emit('validate-user');
            }, (e) => {
              this.ngxService.stop('login');
              this.isError = true;
              if (e.error !== null) {
                if (e.error.code === 403) {
                  this.errorMessage = 'Email Or Password Incorrect.';
                } else {
                  this.errorMessage = 'Seems Like Your Internet is not working';
                }
              } else {
                this.errorMessage = 'Seems Like Your Internet is not working';
              }
            });
        }, () => {
          this.ngxService.stop('login');
        });
    } else {
      this.authRoute.userLogin(this.userDetails)
        .subscribe(data => {
          this.isError = false;
          localStorage.setItem('activeUser', JSON.stringify(data.data));
          localStorage.setItem('active', JSON.stringify({active: true}));
          this.ngxService.stop('login');
          this.socket.emit('validate-user');
        }, (e) => {
          this.ngxService.stop('login');
          this.isError = true;
          if (e.error !== null) {
            if (e.error.code === 403) {
              this.errorMessage = 'Email Or Password Incorrect.';
            } else {
              this.errorMessage = 'Seems Like Your Internet is not working';
            }
          } else {
            this.errorMessage = 'Seems Like Your Internet is not working';
          }
        });
    }
  }

  route() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/auth/register']);

  }
  determineAppServerKey() {
    const publicKey = 'BKZ7q9GnaavKPUheKO8TkBHgRglEA1sYZtjs05Y45scAoTRVMelVj5qTddqTfF48V_JcxYL1scOT_WA9GyWhAes';
    return this.urlBase64ToUint8Array(publicKey);
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


}
