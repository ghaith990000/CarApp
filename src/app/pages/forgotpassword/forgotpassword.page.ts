import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  email : string = '';


  constructor( private authSrv: AuthService) { }

  ngOnInit(): void{
  }

  forgotPassword() {
    this.authSrv.forgotPassword(this.email);
    this.email = '';
  }

}
