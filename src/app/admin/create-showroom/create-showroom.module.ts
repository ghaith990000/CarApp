import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateShowroomPageRoutingModule } from './create-showroom-routing.module';

import { CreateShowroomPage } from './create-showroom.page';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateShowroomPageRoutingModule
  ],
  declarations: [CreateShowroomPage]
})
export class CreateShowroomPageModule {}
