import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestDrivePageRoutingModule } from './test-drive-routing.module';

import { TestDrivePage } from './test-drive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestDrivePageRoutingModule
  ],
  declarations: [TestDrivePage]
})
export class TestDrivePageModule {}
