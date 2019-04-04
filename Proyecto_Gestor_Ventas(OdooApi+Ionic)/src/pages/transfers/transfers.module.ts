import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransfersPage } from './transfers';

@NgModule({
  declarations: [
    TransfersPage,
  ],
  imports: [
    IonicPageModule.forChild(TransfersPage),
  ],
})
export class TransfersPageModule {}
