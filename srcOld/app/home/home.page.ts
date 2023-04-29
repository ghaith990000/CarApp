import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular'
import { DataListService } from '../data-list.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public DataSrv: DataListService){

  }


}
