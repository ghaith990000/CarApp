import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { ReactiveFormsModule } from '@angular/forms';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk4meGEFWQHvKYBtprIW3sSJWVZp_tQfA",
  authDomain: "itcs444carproject-828b3.firebaseapp.com",
  projectId: "itcs444carproject-828b3",
  storageBucket: "itcs444carproject-828b3.appspot.com",
  messagingSenderId: "857014294992",
  appId: "1:857014294992:web:d9bf398110bfdac0db81d5",
  measurementId: "G-1EQJE3C7RY"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule,
    ReactiveFormsModule, AngularFireStorageModule, AngularFireAuthModule,AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
