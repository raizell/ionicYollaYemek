import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YemekDetayPageRoutingModule } from './yemek-detay-routing.module';

import { YemekDetayPage } from './yemek-detay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YemekDetayPageRoutingModule
  ],
  declarations: [YemekDetayPage]
})
export class YemekDetayPageModule {}
