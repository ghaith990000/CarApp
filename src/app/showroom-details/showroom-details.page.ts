import { Component, OnInit } from '@angular/core';
import { Car, ShowroomService } from '../services/showroom.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-showroom-details',
  templateUrl: './showroom-details.page.html',
  styleUrls: ['./showroom-details.page.scss'],
})
export class ShowroomDetailsPage implements OnInit {
  showroomId: string = "";
  showroomDetails: any;
  cars: Car[] = [];
  constructor(public router:Router,public ActRoute: ActivatedRoute, public showroomSrv: ShowroomService) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('showroomId') ?? "";

    if(this.showroomId){
      this.showroomSrv.getShowRoom(this.showroomId).subscribe(showroom => {
        console.log(this.showroomDetails);
        this.showroomDetails = showroom;
      })
    }
  }

  loadCars(showroomId: string){
    this.showroomSrv.getCarsByShowroomId(showroomId).subscribe(
      (data) => {
        this.cars = data;
      },
      (error) => {
        console.log('Error fetching cars', error);
      }
    )
  }

  goToCarDetails(id: string | undefined){
    // this.router.navigateByUrl("/admin/" + this.showroomId + "/car-details/" + id);
    this.router.navigateByUrl("/admin/showrooms/" + this.showroomId + "/car-details/" + id);
   }

  ngOnInit() {
    this.loadCars(this.showroomId);
  }

}
