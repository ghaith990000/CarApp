import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService, public navCtrl: NavController) {

    // this.checkUser()

  }

  // async checkUser(){
  //   if( await this.auth.getUserID() == ""){
  //     this.navCtrl.navigateForward('/login');
  //   }
  // }



}
