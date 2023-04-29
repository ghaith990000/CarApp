import { Component, OnInit } from '@angular/core';
import { DataListService, Item } from '../data-list.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public index: number = 0;
  public newitem: Item;

  constructor(public datalist:DataListService) {
    this.newitem = {} as Item;
  }

  add(){
    this.datalist.add(this.newitem);
    this.datalist.showAlert("Add New Item", "Added Successfully");
  }

  ngOnInit() {
  }

}
