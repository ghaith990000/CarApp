import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowroomService } from 'src/app/services/showroom.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-delete-car',
  templateUrl: './delete-car.page.html',
  styleUrls: ['./delete-car.page.scss'],
})
export class DeleteCarPage implements OnInit {
  showroomId: string = "";
  carId: string = "";
  constructor(public showroomSrv: ShowroomService, public router: Router ,public utility: UtilityService, public ActRoute: ActivatedRoute) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('showroomId') ?? "";
    this.carId = this.ActRoute.snapshot.paramMap.get('carId') ?? "";
    this.showroomSrv.deleteCar(this.showroomId, this.carId);
    this.utility.presentToast("Successfully deleted a car", 5000, "bottom", "success");
    this.router.navigateByUrl("/admin/showroom-details/"+ this.showroomId);
  }

  ngOnInit() {
  }

}
