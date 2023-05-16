import { Component, OnInit } from '@angular/core';
import { Car, Comment, ShowroomService } from '../services/showroom.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {
  car: Car = {} as Car;
  showroomId: string;
  carId: string;
  newComment: string = "";

  user: User = {
    uid: '',
    name: '',
    mobileNumber: '',
    email: '',
    role: '',
    imageUrl: '',
  };


  // storage=new Storage;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    zoom: {
      maxRatio: 3,
      toggle: true,
    }
  };
  constructor(public authSrv: AuthService,public showroomSrv: ShowroomService, public ActRoute: ActivatedRoute) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get("showroomId") ?? "";
    this.carId = this.ActRoute.snapshot.paramMap.get('carId') ?? "";

  }

  async ngOnInit() {
    this.user=this.authSrv.getUserById(await this.authSrv.getUserID());
    console.log(this.user);

    this.loadCar(this.showroomId, this.carId);
  }

  loadCar(showroomId: string, carId: string){
    this.showroomSrv.getCarByShowroomIdAndCarId(showroomId, carId).subscribe(
      (data)=> {
        this.car = data;
        console.log(data);
      },
      (error)=>{
        console.log('Error fetching car', error);
      }
    )
  }

  addNewComment(){
    const comment: Comment = {
      carId: this.carId,
      userId: this.user.uid,
      text: this.newComment,
      createdAt: new Date()
    }
    this.showroomSrv.addComment(comment).then(addedComment => {
      this.newComment = '';
      console.log('Comment added: ', addedComment);
    }).catch(error => {
      console.log('Error adding comment: ', error);
    })
  }

}
