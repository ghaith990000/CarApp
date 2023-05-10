import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteCarPageRoutingModule } from './delete-car-routing.module';

import { DeleteCarPage } from './delete-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteCarPageRoutingModule
  ],
  declarations: [DeleteCarPage]
})
export class DeleteCarPageModule {}
