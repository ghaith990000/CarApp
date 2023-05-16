import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import { Storage } from '@ionic/storage-angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';


export interface User {
  uid: string;
  name: string;
  mobileNumber: string;
  email: string;
  role: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  allUsers: User[] = [];

  title='imageupload';

  fileimg: any;

  image: File | null=null;

  logged: boolean = false;
  loggedEmail: string = "" ;
  loggedRole: string = "";

  storage=new Storage;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public navCtrl: NavController,
    private fireStorage: AngularFireStorage
  ) {
    this.create();
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

  async create(){
    await this.storage.create();
  }

  getUsers(){
    this.users.subscribe((data) => {this.allUsers = data})
  }

  getUserById(uid: string | null | undefined){
    return this.allUsers.find(user => user.uid === uid) as User;
  }

  async getUserID(){
    return await this.storage.get("id");
  }

  // Registration
  async register(name: string, mobileNumber: string ,email: string, password: string, role: 'admin' | 'customer', imageUrl: string): Promise<void>{
    const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
    await this.afs.collection('users').doc(user?.uid).set({
      uid: user?.uid,
      name,
      mobileNumber,
      email,
      role,
      imageUrl 
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

        this.storage.set("id",user?.uid);

        if(this.loggedRole === "admin"){
          this.navCtrl.navigateForward('/admin');
        }else if(this.loggedRole === "customer"){
          this.navCtrl.navigateForward('/tabs/tab1');
        }
      }
    )
  }

  async logout(): Promise<void>{
    await this.afAuth.signOut();
    this.logged = false;
    this.loggedEmail = "";
    this.loggedRole = "";
    await this.storage.remove("id");
    this.navCtrl.navigateForward('/login');
  }

  // Get user role
  getUserRole(uid: string): Observable<any>{
    return this.afs.collection('users').doc(uid).valueChanges();
  }

  events:any; 

  uploadimg: boolean=false;

  uploadImage(event:any){
    this.events=event;
  }
  async updateimage(){
    const file=this.events.target.files[0]
    if(file){

      const randomNum = Math.floor(Math.random() * 1000000);
      const path = `img/${randomNum}_${file.name}`
      const uploadTask = await this.fireStorage.upload(path,file)
      const url = await uploadTask.ref.getDownloadURL()
      this.updateprofile(await this.getUserID(),url);
      return url;
  
  }

  return undefined;

  }

  async updateprofile(uid: string , urls: string ){

    this.usersCollection.doc(uid).update({
      imageUrl: urls
      });
      

  }

  
}
