import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  mobileNumber: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  imageUrl: string='';



  constructor(private authSrv: AuthService, private utilitySrv: UtilityService, private router: Router) {

  }

  registerUser(){
    if(this.name === ""){
      this.utilitySrv.presentToast("You must fill name", 5000, 'bottom', 'failure')

    }else if (this.mobileNumber === ""){
      this.utilitySrv.presentToast("You must fill Mobile Number", 5000, 'bottom', 'failure');

    }else if (this.email === ""){
      this.utilitySrv.presentToast("You must fill email", 5000, 'bottom', 'failure');
    }else if(this.password === ""){
      this.utilitySrv.presentToast("You must fill password", 5000, 'bottom', 'failure');
    }else if(this.confirmPassword === ""){
      this.utilitySrv.presentToast("You must fill confirm password", 5000, 'bottom', 'failure');
    }else if(this.password === this.confirmPassword){
      this.authSrv.register(this.name, this.mobileNumber, this.email, this.password, "customer",this.imageUrl);
      this.utilitySrv.presentToast("User Registered Successfully", 5000, 'bottom', "success");
      this.router.navigate(['/login']);

    }else {
      this.utilitySrv.presentToast("Password and Confirm Password does not match", 5000, 'bottom', 'failure')
    }

  }

  goToLogin(){

  }

  ngOnInit() {
  }

}
