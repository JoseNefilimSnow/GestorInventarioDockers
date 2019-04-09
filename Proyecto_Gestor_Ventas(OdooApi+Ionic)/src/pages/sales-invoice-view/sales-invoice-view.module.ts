import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesInvoiceViewPage } from './sales-invoice-view';

@NgModule({
  declarations: [
    SalesInvoiceViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesInvoiceViewPage),
  ],
})
export class SalesInvoiceViewPageModule {}
