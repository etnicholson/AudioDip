import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { UserLogin } from '../_models/userLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean;
  user: UserLogin;
  error: string;
  @ViewChild('a') loginForm: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.hide = true;
  }

  login() {
    this.user = Object.assign({}, this.loginForm.value);
    this.authService.login(this.user).subscribe(next => {
    }, error => {

      this.error = 'Wrong email or password, try again.';
    }, () => {
      this.router.navigate(['/userPanel']);
    });

  }




}
