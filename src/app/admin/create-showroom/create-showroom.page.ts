import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { ShowroomService, Showroom } from 'src/app/services/showroom.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-showroom',
  templateUrl: './create-showroom.page.html',
  styleUrls: ['./create-showroom.page.scss'],
})
export class CreateShowroomPage implements OnInit {
  image: File | null = null;
  newShowroom: Showroom = {

  } as Showroom;
  constructor(private storage: AngularFireStorage,  private afs:AngularFirestore, private showroomSrv: ShowroomService, private utilitySrv: UtilityService, public router:Router) {

   }

   onFileChange(event: Event){
    const target = event.target as HTMLInputElement;
    if(target.files && target.files.length){
      this.image = target.files[0];
    }
   }

   async createShowroom(){
    if(!this.image){
      return;
    }


    try {
      // Upload image to Firebase Storage
      const storageRef = this.storage.ref(`showroom-images/${this.image.name}`);
      const snapshot = await storageRef.put(this.image);
      const imageUrl = await snapshot.ref.getDownloadURL();
      this.newShowroom.imageUrl = imageUrl;



      // Save showroom data to firestore
      await this.showroomSrv.addShowroom(this.newShowroom);
      this.utilitySrv.presentToast("Showroom added Successfully", 5000, "bottom", "success");


      this.image = null;
      this.router.navigateByUrl('/tab1')
    }catch(error){
      this.utilitySrv.presentToast("Error creating showroom", 5000, "bottom", "failure");
    }
   }

  ngOnInit() {
  }

}
