import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesInvoicePage } from './sales-invoice';

@NgModule({
  declarations: [
    SalesInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(SalesInvoicePage),
  ],
})
export class SalesInvoicePageModule {}
