import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransfersViewPage } from './transfers-view';

@NgModule({
  declarations: [
    TransfersViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TransfersViewPage),
  ],
})
export class TransfersViewPageModule {}
