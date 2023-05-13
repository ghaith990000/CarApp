import { Component, OnInit } from '@angular/core';
import { AuthService , User } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  user: User = {
    uid: '',
    name: '',
    mobileNumber: '',
    email: '',
    role: '',
    imageUrl: '',
  };


  storage=new Storage;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
  
  this.user=this.authService.getUserById(await this.authService.getUserID());
    console.log(this.user);
  }

 

 uploadIMG(event:any){
  this.authService.uploadImage(event);
 }
  
 update(){
  this.authService.updateimage();
 }

  logout() {   
    console.log(1);
    this.authService.logout();
  }

}