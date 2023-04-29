import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authSrv: AuthService, private router: Router) {

  }

  logInUser(){
    this.authSrv.login(this.email, this.password);
  }

  ngOnInit() {
  }

}
