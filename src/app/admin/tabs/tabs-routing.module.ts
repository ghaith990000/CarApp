import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'showrooms',
        children: [
          {
          path: '',
          loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)

          },
          {
            path: 'showroom-details/:id',
            loadChildren: () => import('../../admin/showroom-details/showroom-details.module').then( m => m.ShowroomDetailsPageModule)
          },
          {
            path: ':showroomId/car-details/:carId',
            loadChildren: () => import('../../admin/car-details/car-details.module').then( m => m.CarDetailsPageModule)
          },
        ]
        // loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'test-drive',
        children: [
          {
            path: '',
            loadChildren: () => import('../test-drive/test-drive.module').then( m => m.TestDrivePageModule)
          },
          {
            path: 'test-drive-detail/:testDriveId',
            loadChildren: () => import('../test-drive-detail/test-drive-detail.module').then( m => m.TestDriveDetailPageModule)
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
