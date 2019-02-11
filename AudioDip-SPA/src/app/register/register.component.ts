import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { UserRegister } from '../_models/userRegister';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: UserRegister;
  @ViewChild('f') registerForm: NgForm;
  hide: boolean;
  error: string;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.hide = true;
  }

  /*
  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      confirmPassword: ['']
    });
  }
  */

  passwordMatchValidator(g: NgForm) {
    return g.value.password === g.value.confirmPassword;
  }

  register() {
    if (!this.passwordMatchValidator(this.registerForm)) {
      return  this.error =  'Password doesn\'t match.';
    }
    if (this.registerForm.valid) {
      this.user = Object.assign({});
      this.user.email = this.registerForm.value.email;
      this.user.username = this.registerForm.value.username;
      this.user.password = this.registerForm.value.password;

      this.authService.register(this.user).subscribe(() => {
        console.log('logged in');
      }, error => {
        this.error =  'Email has already been taken. ';
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
