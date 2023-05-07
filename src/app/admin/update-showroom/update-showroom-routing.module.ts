import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateShowroomPage } from './update-showroom.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateShowroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateShowroomPageRoutingModule {}
