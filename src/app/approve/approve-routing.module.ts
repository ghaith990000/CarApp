import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovePage } from './approve.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovePageRoutingModule {}
