import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

export interface Car {
  id?:string;
  showroomId: string;
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

export interface Comment {
  id?: string;
  carId: string;
  userId: string;
  text: string;
  createdAt: Date;
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

  addComment(comment: Comment): Promise<Comment> {
    return new Promise((resolve, reject)=>{
      if(!comment.text){
        return('Comment text cannot be empty.');
        return;
      }

      return this.afs.collection('comments').add(comment).then(() => {
        resolve(comment);
      }).catch(error => {
        reject(error);
      })
    })
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

  getAllCars(): Observable<Car[]>{
    return this.afs.collectionGroup<Car>('cars').snapshotChanges().pipe(
      map((snapshots)=> snapshots.map((snapshot) => {
        const data = snapshot.payload.doc.data();
        const id = snapshot.payload.doc.id;
        const showroomId = snapshot.payload.doc.ref.parent.parent?.id;

        return {id, ...data, showroomId} as Car;
      }))
    )
  }

  searchCars(
    type?: string,
    manufacturer?: string,
    model?: string,
    color?: string[] | null,
    mileage?: {lower: number, upper: number},
    minPrice?: number,
    maxPrice?: number,
  ): Observable<Car[]>{
    return this.getAllCars().pipe(
      map((cars) => cars.filter((car)=>{
        return (
          (!type || car.type === type) &&
          (!manufacturer || car.manufacturer === manufacturer) &&
          (!model || car.model === model) &&
          (!color || color.length===0 || color.some((c)=>car.color.includes(c))) &&
          (!mileage || (!mileage.lower || car.mileage >= mileage.lower) && (!mileage.upper || car.mileage <= mileage.upper)) &&
          (!minPrice || car.price >= minPrice) &&
          (!maxPrice || car.price <= maxPrice)

        )
      }))
    )
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

  async deleteCar(showroomId: string, carId: string): Promise<void>{
    try{
      await this.afs.collection('showrooms').doc(showroomId).collection<Car>('cars').doc(carId).delete()
    }catch(error){
      console.log(`Error deleting car: `, error);
      throw error;
    }
  }

  async updateCar(showroomId: string, carId: string, carData: Partial<Car>): Promise<void>{
    try {
      await this.afs.collection('showrooms').doc(showroomId).collection<Car>('cars').doc(carId).update(carData);
    }catch(error){
      console.log(`Error updating car: `, error);
    }
  }

  updateCarWithImages(showroomId: any, carId: any){
    const showroomRef = this.showroomCollection.doc(showroomId);
    const carsCollection = showroomRef.collection<Car>('cars');

  }
}
