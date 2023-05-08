import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCarPageRoutingModule } from './create-car-routing.module';

import { CreateCarPage } from './create-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCarPageRoutingModule
  ],
  declarations: [CreateCarPage]
})
export class CreateCarPageModule {}
