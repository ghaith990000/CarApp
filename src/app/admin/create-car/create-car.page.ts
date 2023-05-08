import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, ShowroomService } from 'src/app/services/showroom.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.page.html',
  styleUrls: ['./create-car.page.scss'],
})
export class CreateCarPage implements OnInit {
  imagesSelected = false;
  imagesSrc: string[] = [];
  images: File[] = [];

  showroomId: string = "";
  car: Car = {
    type: "",
    manufacturer: "",
    model: "",
    color: "",
    mileage: 0,
    engineSpecifications: {
      horsepower: 0,
      torque:  0,
      fuelEfficiency: 0,
    },
    numberOfSeats: 0,
    specificationAndFeatures: {
      sunroof: false,
      navigation: false,
      heatedSeats: false,
      blindSpotMonitor: false
    },
    price: 0,
    vatPrice: 0,
    imageUrls: [],
  }
  constructor(public storage: AngularFireStorage,public router: Router, public showroomSrv:ShowroomService, public ActRoute: ActivatedRoute, public utilitySrv: UtilityService) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('showroomId') ?? "";
    console.log(this.showroomId);
  }

  onFileSelected(event: any) {
    this.images = event.target.files;
    if (this.images) {
      for (let i = 0; i < this.images.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(this.images[i]);
        reader.onload = () => {
          this.imagesSelected = true;
          this.imagesSrc.push(reader.result as string);
        };
      }
    }
  }

  removeImage(image: string) {
    const index = this.imagesSrc.indexOf(image);
    if (index !== -1) {
      this.imagesSrc.splice(index, 1);
    }
    if (this.imagesSrc.length === 0) {
      this.imagesSelected = false;
    }
  }

  async uploadImages() {
    // let imageUrls = [];
    for (let i = 0; i < this.images.length; i++) {
      const filePath = `${this.showroomId}/cars/${Date.now()}_${i}.jpg`;
      const fileRef = this.storage.ref(filePath);
      const snapshot = await fileRef.put(this.images[i]);
      const downloadUrl = await snapshot.ref.getDownloadURL();

      console.log(`Image ${i + 1} uploaded successfully! Download URL: ${downloadUrl}`);
      // await this..collection()
      this.car.imageUrls.push(downloadUrl);
    }
    // this.car.imageUrls = imageUrls;
    console.log(this.car.imageUrls);
    this.imagesSrc = [];
    this.imagesSelected = false;
  }


  // onFileSelected(event: any){
  //   const file = event.target.files[0];
  //   if(file){
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.imageSelected = true;
  //       this.imageSrc = reader.result;
  //     }
  //   }
  // }

  async createCar(){
    let vat = 5;
    this.car.vatPrice = this.car.price + ((vat /100) * this.car.price);
    this.uploadImages();
    try{
      await this.showroomSrv.createCar(this.showroomId, this.car);
      this.utilitySrv.presentToast("Created Car Successfully", 5000, "bottom", "success");
      this.router.navigateByUrl("/admin/showroom-details/"+this.showroomId);
    }catch(error){
      this.utilitySrv.presentToast("Error Creating Car", 5000, "bottom", "failure");
    }
  }

  ngOnInit() {
  }

}
