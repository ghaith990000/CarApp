import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-drive-detail',
  templateUrl: './test-drive-detail.page.html',
  styleUrls: ['./test-drive-detail.page.scss'],
})
export class TestDriveDetailPage implements OnInit {

  constructor(public ActRoute: ActivatedRoute) { }


  ngOnInit() {
  }

}
