import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovePageRoutingModule } from './approve-routing.module';

import { ApprovePage } from './approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovePageRoutingModule
  ],
  declarations: [ApprovePage]
})
export class ApprovePageModule {}
