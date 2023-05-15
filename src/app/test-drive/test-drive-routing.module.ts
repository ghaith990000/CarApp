import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestDrivePage } from './test-drive.page';

const routes: Routes = [
  {
    path: '',
    component: TestDrivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestDrivePageRoutingModule {}
