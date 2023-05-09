import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

export interface Car {
  id?:string;
  type: string;
  manufacturer: string;
  model: string;
  color: string;
  mileage: number;
  engineSpecifications: {
    horsepower: number;
    torque:  number;
    fuelEfficiency: number;
  };
  numberOfSeats: number;
  specificationAndFeatures: {
    sunroof: boolean,
    navigation: boolean,
    heatedSeats: boolean,
    blindSpotMonitor: boolean
  };
  price: number;
  vatPrice: number;
  imageUrls: string[];
}
export interface Showroom {
  id?: string;
  title: string;
  description?: string;
  imageUrl: string;
}



@Injectable({
  providedIn: 'root'
})
export class ShowroomService {
  private showrooms: Observable<Showroom[]>;
  private showroomCollection: AngularFirestoreCollection<Showroom>;
  constructor(private afs: AngularFirestore) {
    this.showroomCollection = this.afs.collection<Showroom>('showrooms');
    this.showrooms = this.showroomCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      })
    )
  }

  getShowrooms(): Observable<Showroom[]>{
    return this.showrooms;
  }

  getShowRoom(id: string): Observable<Showroom|undefined>{
    return this.showroomCollection.doc<Showroom>(id).valueChanges().pipe(
      map(showroom => {
        showroom!.id = id;
        return showroom;
      })
    )
  }

  addShowroom(showroom: Showroom){
    return this.showroomCollection.add({
      title: showroom.title,
      description: showroom.description,
      imageUrl: showroom.imageUrl,
    });
  }

  updateShowroom(id: string, showroom: Showroom): Promise<void>{
    return this.showroomCollection.doc(id).update({
      title: showroom.title,
      description: showroom.description,
      imageUrl: showroom.imageUrl,
    })
  }

  deleteShowroom(id: any): Promise<void>{
    return this.showroomCollection.doc(id).delete();
  }

  createCar(showroomId: any, car: Car){
    const showroomRef = this.showroomCollection.doc(showroomId);
    const carsCollection = showroomRef.collection<Car>('cars');
    return carsCollection.add(car);
  }

  getCarsByShowroomId(showroomId: string): Observable<Car[]>{
    return this.afs.collection('showrooms').doc(showroomId).collection<Car>('cars').snapshotChanges().pipe(
      map((snapshots) => snapshots.map((snapshot) =>{
        const data = snapshot.payload.doc.data();
        const id = snapshot.payload.doc.id;

        return {id, ...data} as Car;
      }))
    )
  }

  getCarByShowroomIdAndCarId(showroomId: string, carId: string): Observable<Car>{
    return this.afs.collection('showrooms').doc(showroomId).collection<Car>('cars').doc(carId).snapshotChanges().pipe(
      map((snapshot)=> {
        const data = snapshot.payload.data();
        const id = snapshot.payload.id;

        return {id, ...data} as Car;
      })
    )
  }

  updateCarWithImages(showroomId: any, carId: any){
    const showroomRef = this.showroomCollection.doc(showroomId);
    const carsCollection = showroomRef.collection<Car>('cars');

  }
}
