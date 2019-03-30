import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalePage } from './sale';

@NgModule({
  declarations: [
    SalePage,
  ],
  imports: [
    IonicPageModule.forChild(SalePage),
  ],
})
export class SalePageModule {}
