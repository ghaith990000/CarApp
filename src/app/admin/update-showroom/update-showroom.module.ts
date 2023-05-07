import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateShowroomPageRoutingModule } from './update-showroom-routing.module';

import { UpdateShowroomPage } from './update-showroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateShowroomPageRoutingModule
  ],
  declarations: [UpdateShowroomPage]
})
export class UpdateShowroomPageModule {}
