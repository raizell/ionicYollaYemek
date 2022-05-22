import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YemekDetayPage } from './yemek-detay.page';

const routes: Routes = [
  {
    path: '',
    component: YemekDetayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YemekDetayPageRoutingModule {}
