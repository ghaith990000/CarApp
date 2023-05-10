import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowroomService } from 'src/app/services/showroom.service';
import { Car } from 'src/app/services/showroom.service';
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {
  car: Car = {} as Car;
  showroomId: string;
  carId: string;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    zoom: {
      maxRatio: 3,
      toggle: true,
    }
  };
  constructor(public showroomSrv: ShowroomService, public ActRoute: ActivatedRoute) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('showroomId') ?? "";
    this.carId = this.ActRoute.snapshot.paramMap.get('carId') ?? "";
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

}
