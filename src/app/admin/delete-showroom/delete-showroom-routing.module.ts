import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteShowroomPage } from './delete-showroom.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteShowroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteShowroomPageRoutingModule {}
