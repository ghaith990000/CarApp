import { Component, OnInit } from '@angular/core';
import { AuthService , User } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

  user: User = {
    uid: '',
    name: '',
    mobileNumber: '',
    email: '',
    role: '',
    imageUrl: ''
  };

  storage=new Storage;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
  
  this.user=this.authService.getUserById(await this.authService.getUserID());
    console.log(this.user);
  }

  logout1(){
    console.log(2);
  }

  logout() {   
    console.log(1);
    this.authService.logout();
  }

}