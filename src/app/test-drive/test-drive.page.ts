import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TestDriveService } from '../services/test-drive.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-test-drive',
  templateUrl: './test-drive.page.html',
  styleUrls: ['./test-drive.page.scss'],
})
export class TestDrivePage implements OnInit {
  dob: string = "";
  user : User = {} as User;
  showroomId: string;
  carId: string;
  constructor(public authService: AuthService, public ActRoute: ActivatedRoute, public testDriveSrv: TestDriveService, public utilitySrv: UtilityService) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('showroomId') ?? "";
    this.carId = this.ActRoute.snapshot.paramMap.get('carId') ?? "";
  }

  async getUserData(){
    this.user=this.authService.getUserById(await this.authService.getUserID());
    console.log(this.user);
  }
  ngOnInit() {
    this.getUserData();
  }

  requestDrive(){
    console.log("Request Date", this.dob);
    console.log("Logged User is ", this.user);
    try{

      this.testDriveSrv.reserveTestDrive(this.carId, this.showroomId,this.user.uid, this.dob)
    }catch(error){
    }

  }

}
