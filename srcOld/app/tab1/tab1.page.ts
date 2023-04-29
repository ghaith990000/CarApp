import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataListService, Item } from '../data-list.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(public datalist:DataListService, public navCtrl:NavController) { }
  openTab(i: number, item: Item){
    this.navCtrl.navigateForward('/tab2/'+i);
  }

  delete(i: number, item:Item){
    this.datalist.remove(item, i);
  }

  ngOnInit() {
  }

}
