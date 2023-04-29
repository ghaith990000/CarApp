import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

export interface User {
  uid: string;
  name: string;
  mobileNumber: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  allUsers: User[] = [];

  logged: boolean = false;
  loggedEmail: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.usersCollection = this.afs.collection<User>('users')
    this.users = this.afs.collection<User>('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    )

    this.getUsers();
    console.log(this.allUsers)
  }

  getUsers(){
    this.users.subscribe((data) => {this.allUsers = data})
  }

  // Registration
  async register(name: string, mobileNumber: string ,email: string, password: string, role: 'admin' | 'customer'): Promise<void>{
    const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
    await this.afs.collection('users').doc(user?.uid).set({
      uid: user?.uid,
      name,
      mobileNumber,
      email,
      role
    })
  }

  login(email: string, password: string){
    this.afAuth.signInWithEmailAndPassword(email, password).then(
      (userCredential) => {
        console.log('User Credential:', userCredential);

        // Access the User object
        const user = userCredential.user;

      }
    )
  }

  async logout(): Promise<void>{
    await this.afAuth.signOut();
  }

  // Get user role
  getUserRole(uid: string): Observable<any>{
    return this.afs.collection('users').doc(uid).valueChanges();
  }
}
