import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowroomService } from 'src/app/services/showroom.service';

@Component({
  selector: 'app-showroom-details',
  templateUrl: './showroom-details.page.html',
  styleUrls: ['./showroom-details.page.scss'],
})
export class ShowroomDetailsPage implements OnInit {
  showroomId: string = "";
  showroomDetails: any;
  constructor(public router: Router, public showroomSrv:ShowroomService, public ActRoute: ActivatedRoute) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('id') ?? "";

    if(this.showroomId){
      this.showroomSrv.getShowRoom(this.showroomId).subscribe(showroom => {
        this.showroomDetails = showroom;
        console.log(this.showroomDetails);
      })
    }

   }

   navToCreateCar(){
    this.router.navigateByUrl("/admin/"+this.showroomId+"/create-car");
   }

  ngOnInit() {
  }

}
