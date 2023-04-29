import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataListService } from '../data-list.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public index: number = 0;
  constructor(private activatedRoute: ActivatedRoute, public datalist:DataListService) { }


  ngOnInit() {
    this.index = Number(this.activatedRoute.snapshot.paramMap.get('index'));
    this.datalist.newitem = this.datalist.List[this.index];
  }

  delete(){
    this.datalist.remove(this.datalist.newitem, this.index)
  }

}
