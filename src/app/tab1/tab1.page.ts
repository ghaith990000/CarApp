import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Showroom, ShowroomService } from '../services/showroom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  public showrooms: Observable<Showroom[]>
  constructor(private showroomSrv: ShowroomService, public router: Router) {
    this.showrooms = this.showroomSrv.getShowrooms();

   }

  navToCreateShowroom(){
    this.router.navigate([''])
  }

  goToDetail(id: string| undefined){
    this.router.navigateByUrl(`/tabs/tab1/showroom-details/${id}`)
  }

  ngOnInit() {
    // this.showrooms = this.showroomSrv.getShowrooms();
  }


}
