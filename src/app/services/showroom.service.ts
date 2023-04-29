import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
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

  addShowroom(showroom: Showroom): Promise<DocumentReference>{
    return this.showroomCollection.add(showroom);
  }

  updateShowroom(showroom: Showroom): Promise<void>{
    return this.showroomCollection.doc(showroom.id).update({
      title: showroom.title,
      description: showroom.description,
      imageUrl: showroom.imageUrl
    })
  }

  deleteShowroom(id: any): Promise<void>{
    return this.showroomCollection.doc(id).delete();
  }
}
