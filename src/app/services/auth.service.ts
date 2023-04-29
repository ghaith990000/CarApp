import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { NavController } from '@ionic/angular';
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
  loggedEmail: string = "" ;
  loggedRole: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public navCtrl: NavController
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

  getUserById(uid: string | null | undefined){
    return this.allUsers.find(user => user.uid === uid) as User;
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
        let user = userCredential.user
        // Access the User object
        this.logged = true;
        this.loggedEmail = email;
        this.loggedRole = this.getUserById(user?.uid).role
        console.log(this.loggedRole);

        if(this.loggedRole === "admin"){
          this.navCtrl.navigateForward('/tabs/tab2');
        }else if(this.loggedRole === "customer"){
          this.navCtrl.navigateForward('/admin/tabs/tab1');
        }
      }
    )
  }

  async logout(): Promise<void>{
    await this.afAuth.signOut();
    this.logged = false;
    this.loggedEmail = "";
    this.loggedRole = ""
  }

  // Get user role
  getUserRole(uid: string): Observable<any>{
    return this.afs.collection('users').doc(uid).valueChanges();
  }
}
