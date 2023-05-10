import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCarPage } from './update-car.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCarPageRoutingModule {}
