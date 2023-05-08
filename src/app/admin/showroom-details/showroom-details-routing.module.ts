import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowroomDetailsPage } from './showroom-details.page';

const routes: Routes = [
  {
    path: '',
    component: ShowroomDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowroomDetailsPageRoutingModule {}
