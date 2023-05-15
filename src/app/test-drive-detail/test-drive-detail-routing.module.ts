import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestDriveDetailPage } from './test-drive-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TestDriveDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestDriveDetailPageRoutingModule {}
