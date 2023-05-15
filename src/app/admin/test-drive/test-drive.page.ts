import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';
import { Car, ShowroomService } from 'src/app/services/showroom.service';
import { TestDrive, TestDriveService } from 'src/app/services/test-drive.service';

@Component({
  selector: 'app-test-drive',
  templateUrl: './test-drive.page.html',
  styleUrls: ['./test-drive.page.scss'],
})
export class TestDrivePage implements OnInit {
  testDrives: TestDrive[] = [];
  user: User = {} as User;
  cars: Car[] = [];
  constructor(public showroomSrv:ShowroomService, private testDriveSrv: TestDriveService, public authSrv: AuthService) { }

  loadTestDrives(){
    this.testDriveSrv.getAllTestDrives().subscribe((testDrives) => {
      this.testDrives = testDrives;
      for(let i = 0; i<this.testDrives.length; i++){
        let testDrive = this.testDrives[i];
        this.showroomSrv.getCarByShowroomIdAndCarId(testDrive.showroomId, testDrive.carId).subscribe(
          (data) => {
            this.cars[i] = data;
            console.log(this.cars[i]);
          },
          (error) => {
            console.log('Error fetching car', error);
          }
        )
      }
    })
  }

  async getUserData(){
    this.user=this.authSrv.getUserById(await this.authSrv.getUserID());
    console.log(this.user);
  }
  ngOnInit() {
    this.loadTestDrives();
  }

}
