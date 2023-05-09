import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowroomService } from 'src/app/services/showroom.service';
import { Car } from 'src/app/services/showroom.service';
@Component({
  selector: 'app-showroom-details',
  templateUrl: './showroom-details.page.html',
  styleUrls: ['./showroom-details.page.scss'],
})
export class ShowroomDetailsPage implements OnInit {
  showroomId: string = "";
  showroomDetails: any;
  cars: Car[] = [];
  showMenu: boolean[] = Array(this.cars.length).fill(false);
  constructor(public router: Router, public showroomSrv:ShowroomService, public ActRoute: ActivatedRoute) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('id') ?? "";

    if(this.showroomId){
      this.showroomSrv.getShowRoom(this.showroomId).subscribe(showroom => {
        console.log(this.showroomDetails);
        this.showroomDetails = showroom;
      })
    }

   }

   navToCreateCar(){
    this.router.navigateByUrl("/admin/"+this.showroomId+"/create-car");
   }



  ngOnInit() {
    this.loadCars(this.showroomId);
  }

  toggleMenu(index: number){
    this.showMenu[index] = !this.showMenu[index];
   }

  loadCars(showroomId: string){
    this.showroomSrv.getCarByShowroomId(showroomId).subscribe(
      (data) => {
        this.cars = data;
      },
      (error) => {
        console.log('Error fetching cars', error);
      }
    )
  }

}
