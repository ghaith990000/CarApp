import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCarPageRoutingModule } from './update-car-routing.module';

import { UpdateCarPage } from './update-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCarPageRoutingModule
  ],
  declarations: [UpdateCarPage]
})
export class UpdateCarPageModule {}
