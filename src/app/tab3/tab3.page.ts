import { Component } from '@angular/core';
import { TestDrive, TestDriveService } from '../services/test-drive.service';
import { AuthService, User } from '../services/auth.service';
import { Car, ShowroomService } from '../services/showroom.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  testDrives: TestDrive[] = [];
  user: User = {} as User;
  cars: Car[] = [];
  constructor(public showroomSrv:ShowroomService,private testDriveSrv: TestDriveService, public authSrv: AuthService ) {

   }

   loadCar(){
    this.testDriveSrv.getUserTestDrives(this.user.uid).subscribe((testDrives) => {
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
  async ngOnInit(){
    await this.getUserData();
    const userId = this.user.uid;
    // this.testDriveSrv.getUserTestDrives(userId).subscribe((testDrives)=>{
    //   this.testDrives= testDrives;
    // })
    this.loadCar();


    console.log("Test Drives", this.testDrives);
  }

  makeDrive(){

  }


  }


