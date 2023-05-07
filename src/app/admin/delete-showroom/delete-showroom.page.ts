import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowroomService } from 'src/app/services/showroom.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-delete-showroom',
  templateUrl: './delete-showroom.page.html',
  styleUrls: ['./delete-showroom.page.scss'],
})
export class DeleteShowroomPage implements OnInit {
  showroomId: string = "";
  constructor(public utilitySrv: UtilityService,public router:Router, public showroomSrv:ShowroomService, public ActRoute: ActivatedRoute) {
    this.showroomId =this.ActRoute.snapshot.paramMap.get('id') ?? "";
    this.showroomSrv.deleteShowroom(this.showroomId);
    this.utilitySrv.presentToast("Showroom deleted successfully", 5000, "bottom", "success");
    this.router.navigateByUrl("/admin/showrooms");
  }

  ngOnInit() {
  }

}
