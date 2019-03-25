import {Component, OnInit} from '@angular/core';
import jQuery from 'jquery';
import {Router} from '@angular/router';
import {AuthRouterService} from '../auth-router.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userDetails = {
    email: '',
    name: '',
    username: '',
    phone: '',
    password: '',
  };
  isError = false;
  errorMessage = '';
  constructor(
    private router: Router,
    private authRoute: AuthRouterService,
  ) {
  }

  ngOnInit() {
    (($) => {
      'use strict';
      /*==================================================================
      [ Validate ]*/
      const inputs = $('.validate-input .input100');

      $('.validate-form').on('submit', () => {
        let check = true;

        for (let i = 0; i < inputs.length; i++) {
          if (validate(inputs[i], i) === false) {
            showValidate(inputs[i]);
            check = false;
          }
        }

        if (check) {
          this.registerUser();
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

      function validate(input, index) {
        if ($(input).attr('name') === 'email') {
          if ($(input)
            .val()
            .trim()
            .match(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(]?)$/)
            == null) {
            return false;
          }
        } else if ($(input).attr('type') === 'confirmPass' || $(input).attr('name') === 'confirmPass') {
          return $(input).val() === $(inputs[index - 1]).val();
        } else {
          if ($(input).val().trim() === '') {
            return false;
          }
        }
      }

      function showValidate(input) {
        const thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
      }

      function hideValidate(input) {
        const thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
      }


    })(jQuery);
  }

  route() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/']);
  }

  registerUser() {
    this.authRoute.registerUser(this.userDetails)
      .subscribe(() => {
        this.isError = false;
        this.route();
      }, e => {
        this.isError = true;
        if (e.error.code === 11000) {
          this.errorMessage = `Email Already Exist. Go back Login Instead`;
        } else {
          this.errorMessage = 'Seems Like Your Internet is not working';
        }
      });
  }

}
