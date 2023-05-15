import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestDriveService } from 'src/app/services/test-drive.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-test-drive-detail',
  templateUrl: './test-drive-detail.page.html',
  styleUrls: ['./test-drive-detail.page.scss'],
})
export class TestDriveDetailPage implements OnInit {
  testDriveId: string;
  constructor(public ActRoute: ActivatedRoute, public testDriveService: TestDriveService, public utilitySrv: UtilityService) {
    this.testDriveId = this.ActRoute.snapshot.paramMap.get('testDriveId') ?? "";
  }

  ngOnInit() {
  }

  updateStatus(status: string){
    try{

      this.testDriveService.updateTestDriveStatusById(this.testDriveId, status);
      this.utilitySrv.presentToast("Test drive status updated", 3000, 'bottom', 'success')
    }catch(error){
      this.utilitySrv.presentToast("Failed to update test drive status", 3000, 'bottom', 'failure')

    }
  }

}
