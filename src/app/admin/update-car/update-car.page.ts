import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, ShowroomService } from 'src/app/services/showroom.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.page.html',
  styleUrls: ['./update-car.page.scss'],
})
export class UpdateCarPage implements OnInit {
  carDetails: any;
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
  imagesSelected = false;
  imagesSrc: string[] = [];
  images: File[] = [];
  showroomId: string = "";
  carId: string = "";

  constructor(public storage: AngularFireStorage, public router: Router, public showroomSrv: ShowroomService, public ActRoute: ActivatedRoute, public utilitySrv: UtilityService) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get("showroomId") ?? "";
    this.carId = this.ActRoute.snapshot.paramMap.get("carId") ?? "";


  }

  ngOnInit() {
    this.loadCar(this.showroomId, this.carId);
  }

  loadCar(showroomId: string, carId: string){
    this.showroomSrv.getCarByShowroomIdAndCarId(showroomId, carId).subscribe(
      (data)=> {
        this.car = data;
        console.log(data);
      },
      (error)=>{
        console.log('Error fetching car', error);
      }
    )
  }


  onFileSelected(event: any){
    this.images = event.target.files;
    if(this.images){
      for(let i=0; i< this.images.length; i++){
        const reader = new FileReader();
        reader.readAsDataURL(this.images[i]);
        reader.onload = () =>{
          this.imagesSelected = true;
          this.imagesSrc.push(reader.result as string);
        }
      }
    }
  }

  removeImage(image: string){
    const index = this.imagesSrc.indexOf(image);
    if(index !== -1){
      this.imagesSrc.splice(index, 1);
    }
    if(this.imagesSrc.length === 0){
      this.imagesSelected = false;
    }
  }


  async uploadImages(){
    for(let i=0; i<this.images.length; i++){
      const filePath = `${this.showroomId}/cars/${Date.now()}_${i}.jpg`;
      const fileRef = this.storage.ref(filePath);
      const snapshot = await fileRef.put(this.images[i]);
      const downloadUrl = await snapshot.ref.getDownloadURL();

      console.log(`Image ${i+1} uploaded successfully! Download URL: ${downloadUrl}`);
      this.car.imageUrls.push(downloadUrl);
    }
    console.log(this.car.imageUrls);
    this.imagesSrc = [];
    this.imagesSelected = false;
  }

  async updateCar(){
    let vat = 5;
    this.car.vatPrice = this.car.price + ((vat/100) * this.car.price);
    await this.uploadImages();
    if(this.car.imageUrls.length <= 0){
      this.utilitySrv.presentToast("You must select car images", 5000, "bottom", "failure");
      return;
    }

    try{
      await this.showroomSrv.updateCar(this.showroomId, this.carId, this.car);
      this.utilitySrv.presentToast("Car updated Successfully", 5000, "bottom", "success");
      this.router.navigateByUrl("/admin/showroom-details/"+this.showroomId);
    }catch(error){
      this.utilitySrv.presentToast("Error while updating car", 5000, "bottom", "failure");
    }
  }

}
