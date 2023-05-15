import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { take} from 'rxjs/operators';
import { Car } from './showroom.service';
import { first } from 'rxjs/operators';
import { User } from './auth.service';
import { UtilityService } from './utility.service';
export interface TestDrive {
  id?: string;
  carId: string;
  userId: string;
  dateString: string;
  showroomId: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestDriveService {
  private testDriveCollection: AngularFirestoreCollection<TestDrive>;
  private testDrives: Observable<TestDrive[]>;
  constructor(public firebase:AngularFirestore, public utilitySrv: UtilityService) {
    this.testDriveCollection = firebase.collection<TestDrive>('testDrives');
    this.testDrives = this.testDriveCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TestDrive;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    )
   }

   reserveTestDrive(carId: string, showroomId: string, userId: string, dateString: string) {
    const date = new Date(dateString);
    const testDrivesCollection = this.firebase.collection<TestDrive>('testDrives');
    const userTestDrives = testDrivesCollection.ref.where('userId', '==', userId).where('status', '==', 'Pending');

    userTestDrives.get().then(snapshot => {
      if (snapshot.docs.length >= 3) {
        // The user has already made three test drive requests
        // Throw an error or display a message to the user
        this.utilitySrv.presentToast("You have already made three test drive requests", 5000, 'bottom', 'failure');
        return;
      } else {
        const carTestDrives = testDrivesCollection.ref.where('carId', '==', carId).where('status', '==', 'Pending');
        carTestDrives.get().then(carSnapshot => {
          const conflictingTestDrives = carSnapshot.docs.filter(doc => Math.abs(date.getTime() - Date.parse(doc.data().dateString)) < 30 * 60 * 1000);
          if (conflictingTestDrives.length > 0) {
            this.utilitySrv.presentToast("This date is already reserved", 5000, 'bottom', 'failure');
            return;
          } else {
            // User can request a new test drive
            const testDrive: TestDrive = {
              carId,
              userId,
              dateString,
              showroomId,
              status: 'Pending',
            };

            testDrivesCollection.add(testDrive);
            this.utilitySrv.presentToast("Successfully made a test drive request", 5000, 'bottom', 'success');
          }
        });
      }
    });
  }



  getUserTestDrives(userId: string){
    return this.firebase.collection<TestDrive>('testDrives', ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TestDrive;
        const id = a.payload.doc.id;
        return { id, ...data} as TestDrive;
      }))
    )
  }

  getAllTestDrives(){
    return this.firebase.collection<TestDrive>('testDrives').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TestDrive;
        const id = a.payload.doc.id;
        return { id, ...data} as TestDrive;
      }))
    )
  }


  //  reserveTestDrive(carId: string, userId: string, dateString: string) {
  //   const date = new Date(dateString);
  //   const carTestDrives = this.firebase.collection<TestDrive>('testDrives', ref => ref.where('carId', '==', carId));
  //   carTestDrives.valueChanges().pipe(
  //     take(4),
  //     map(testDrives => testDrives.filter(testDrive => testDrive.status === 'Pending' && Math.abs(date.getTime()) - Date.parse(testDrive.dateString) < 30 * 60 * 1000)),
  //   ).subscribe(testDrives => {
  //     const userTestDrives = testDrives.filter(testDrive => testDrive.userId === userId);
  //     console.log(userTestDrives);
  //     if (testDrives.length > 0) {
  //       this.utilitySrv.presentToast("This date is already reserved", 5000, 'bottom', 'failure');
  //       return;
  //     } else if (userTestDrives.length >= 3) {
  //       // The user has already made three test drive requests
  //       // Throw an error or display a message to the user
  //       this.utilitySrv.presentToast("You have already made three test drive requests", 5000, 'bottom', 'failure');
  //       return;
  //     } else {
  //       // User can request a new test drive
  //       const testDrive: TestDrive = {
  //         carId,
  //         userId,
  //         dateString,
  //         status: 'Pending',
  //       };

  //       this.testDriveCollection.add(testDrive);
  //       this.utilitySrv.presentToast("Successfully made a test drive request", 5000, 'bottom', 'success');
  //     }
  //   })
  // }
}
