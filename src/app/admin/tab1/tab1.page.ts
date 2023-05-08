import { Component, OnInit } from '@angular/core';
import { Showroom, ShowroomService } from 'src/app/services/showroom.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public showrooms: Observable<Showroom[]>
  constructor(private showroomSrv: ShowroomService, public router: Router) {
    this.showrooms = this.showroomSrv.getShowrooms();

   }

  navToCreateShowroom(){
    this.router.navigate([''])
  }

  goToDetail(id: string| undefined){
    this.router.navigateByUrl(`/admin/showroom-details/${id}`)
  }

  ngOnInit() {
    // this.showrooms = this.showroomSrv.getShowrooms();
  }

}
