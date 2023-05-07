import { Component, OnInit } from '@angular/core';
import { Showroom, ShowroomService } from 'src/app/services/showroom.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-update-showroom',
  templateUrl: './update-showroom.page.html',
  styleUrls: ['./update-showroom.page.scss'],
})
export class UpdateShowroomPage implements OnInit {
  showroomId: string = "";
  showroomDetails: any;
  image: File | null = null;
  showroom: Showroom = {

  } as Showroom;
  constructor(public utilitySrv: UtilityService,public router:Router, public showroomSrv:ShowroomService, public ActRoute: ActivatedRoute, private storage: AngularFireStorage) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('id') ?? "";
    if(this.showroomId){
      this.showroomSrv.getShowRoom(this.showroomId).subscribe(showroom => {
        this.showroomDetails = showroom;
        console.log(this.showroomDetails);
      })
    }
   }

  onFileChange(event: Event){
    const target = event.target as HTMLInputElement;
    if(target.files && target.files.length){
      this.image = target.files[0];
    }
   }
  ngOnInit() {
  }

  async updateShowroom(){
    if(!this.image){
      this.utilitySrv.presentToast("You must select an Image", 5000, "bottom", "failure");
      return
    }

    try {
      // Upload updated image to firebase
        const storageRef = this.storage.ref(`showroom-images/${this.image.name}`);
        const snapshot = await storageRef.put(this.image);
        const imageUrl = await snapshot.ref.getDownloadURL();
        this.showroom.imageUrl = imageUrl;



      // Update showroom of the specified id
      this.showroomSrv.updateShowroom(this.showroomId,this.showroom);
      this.utilitySrv.presentToast("Showroom updated Successfully", 5000, "bottom", "success");

      this.image = null;
      this.router.navigateByUrl('/admin/showrooms');
    }catch(error){

    }
  }

}
