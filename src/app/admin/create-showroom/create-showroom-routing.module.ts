import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateShowroomPage } from './create-showroom.page';

const routes: Routes = [
  {
    path: '',
    component: CreateShowroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateShowroomPageRoutingModule {}
