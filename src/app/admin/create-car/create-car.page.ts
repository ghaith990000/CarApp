import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car, ShowroomService } from 'src/app/services/showroom.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.page.html',
  styleUrls: ['./create-car.page.scss'],
})
export class CreateCarPage implements OnInit {
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
  constructor(public router: Router, public showroomSrv:ShowroomService) { }

  createCar(){
    this.showroom
  }

  ngOnInit() {
  }

}
