import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCarPage } from './create-car.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCarPageRoutingModule {}
