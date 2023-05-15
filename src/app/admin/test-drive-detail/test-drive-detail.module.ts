import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestDriveDetailPageRoutingModule } from './test-drive-detail-routing.module';

import { TestDriveDetailPage } from './test-drive-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestDriveDetailPageRoutingModule
  ],
  declarations: [TestDriveDetailPage]
})
export class TestDriveDetailPageModule {}
