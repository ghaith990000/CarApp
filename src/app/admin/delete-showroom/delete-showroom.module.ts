import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteShowroomPageRoutingModule } from './delete-showroom-routing.module';

import { DeleteShowroomPage } from './delete-showroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteShowroomPageRoutingModule
  ],
  declarations: [DeleteShowroomPage]
})
export class DeleteShowroomPageModule {}
