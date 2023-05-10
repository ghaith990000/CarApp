import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteCarPage } from './delete-car.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteCarPageRoutingModule {}
