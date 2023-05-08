import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowroomDetailsPageRoutingModule } from './showroom-details-routing.module';

import { ShowroomDetailsPage } from './showroom-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowroomDetailsPageRoutingModule
  ],
  declarations: [ShowroomDetailsPage]
})
export class ShowroomDetailsPageModule {}
