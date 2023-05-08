import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./admin/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./admin/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./admin/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'admin/create-showroom',
    loadChildren: () => import('./admin/create-showroom/create-showroom.module').then( m => m.CreateShowroomPageModule)
  },
  {
    path: 'admin/update-showroom/:id',
    loadChildren: () => import('./admin/update-showroom/update-showroom.module').then( m => m.UpdateShowroomPageModule)
  },
  {
    path: 'admin/delete-showroom/:id',
    loadChildren: () => import('./admin/delete-showroom/delete-showroom.module').then( m => m.DeleteShowroomPageModule)
  },
  {
    path: 'admin/showroom-details/:id',
    loadChildren: () => import('./admin/showroom-details/showroom-details.module').then( m => m.ShowroomDetailsPageModule)
  },
  {
    path: 'admin/:showroomId/create-car',
    loadChildren: () => import('./admin/create-car/create-car.module').then( m => m.CreateCarPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
