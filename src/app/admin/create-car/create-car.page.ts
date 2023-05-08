import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, ShowroomService } from 'src/app/services/showroom.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.page.html',
  styleUrls: ['./create-car.page.scss'],
})
export class CreateCarPage implements OnInit {
  imageSelected = false;
  imageSrc: string | ArrayBuffer | null = '' ;

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
    vatPrice: 0
  }
  constructor(public router: Router, public showroomSrv:ShowroomService, public ActRoute: ActivatedRoute, public utilitySrv: UtilityService) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('showroomId') ?? "";
    console.log(this.showroomId);
  }

  onFileSelected(event: any){
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSelected = true;
        this.imageSrc = reader.result;
      }
    }
  }

  async createCar(){
    let vat = 5;
    this.car.vatPrice = this.car.price + ((vat /100) * this.car.price);
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
