import { Component, OnInit } from '@angular/core';
import jQuery from 'jQuery';
import {Router} from "@angular/router";
import {AuthRouterService} from "../auth-router.service";
import { Socket } from 'ngx-socket-io';
import {SharedService} from "../../services/shared/shared.service";

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

  constructor(
    public router: Router,
    private socket: Socket,
    private authRoute: AuthRouterService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    ( ($) => {
      "use strict";


      /*==================================================================
      [ Validate ]*/
      let input = $('.validate-input .input100');

      $('.validate-form').on('submit',() => {
        let check = true;

        for(let i=0; i<input.length; i++) {
          if(validate(input[i]) == false){
            showValidate(input[i]);
            check=false;
          }
        }

        if(check){
          this.userLogin();
          check = false;
          return check
        } else {
          return check;
        }
      });


      $('.validate-form .input100').each(function(){
        $(this).focus(function(){
          hideValidate(this);
        });
      });

      function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
          if($(input).val().trim().match(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(]?)$/) == null) {
            return false;
          }
        }
         else {
          if($(input).val().trim() == ''){
            return false;
          }
        }
      }

      function showValidate(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
      }

      function hideValidate(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
      }
    })(jQuery);

    this.socket.on('validated-user', users => {
      if(users.length > 0) {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));
        const filteredUsers = users.filter(function(user) {
          return user._id !== activeUser._id
        });
        this.sharedService.setUsers(filteredUsers);
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/chats/users'])
      }
    })
    const activeUSer = JSON.parse(localStorage.getItem('activeUser'));
    const active = JSON.parse(localStorage.getItem('active'));
    if(activeUSer !== null) {
      if(Object.keys(activeUSer).length > 0 && active.active === true) {
        this.socket.emit('validate-user');
      }
    }
  }

  userLogin(){
    this.authRoute.userLogin(this.userDetails)
      .subscribe(data => {
        localStorage.setItem('activeUser', JSON.stringify(data.data));
        localStorage.setItem('active', JSON.stringify({active: true}));
        this.socket.emit('validate-user');
      })
  }

  route(){
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/auth/register'])

  }

}
