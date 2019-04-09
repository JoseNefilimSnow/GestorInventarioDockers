import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from "../../services/utils";
import { SalesInvoiceViewPage } from "../sales-invoice-view/sales-invoice-view";
import { OdooJsonRpc } from "../../services/odoojsonrpc";
import { Network } from "@ionic-native/network";

@IonicPage()
@Component({
  selector: 'page-sales-invoice',
  templateUrl: 'sales-invoice.html',
})
export class SalesInvoicePage {

  private accountArray: Array<{
    id: number;
    number: string;
  }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private odooRpc: OdooJsonRpc, private network: Network, private utils: Utils) {
    this.display();
  }

  /** Estos métodos guardan en el array a mostrar los elementos de la tabla de Facturas */

  /**
   * Aqui se muestran las respuestas del servidor dentro de la tabla Facturas y llama al método para rellenar array
   */

  private display(): void {
    this.utils.presentLoading("Cargando ...");
    this.odooRpc
      .getRecord('account.invoice', [], [], 0, 0, "")
      .then((res: any) => {
        this.utils.dismissLoading();
        this.fillParners(res);
      });
  }

  /**
   * El método rellena el array
   */

  private fillParners(res: any): void {
    let json = JSON.parse(res._body);
    if (!json.error) {
      let data = json["result"].records;

      for (let i in data) {
        this.accountArray.push({
          id: data[i].id,
          number: data[i].number == false ? "N/A" : data[i].number,
        });
      }
    }
  }

  /** 
   * Método que te abre cada instancia de Facturas
  */

  private view(idx: number): void {
    let params = {
      id: this.accountArray[idx].id
    };
    this.navCtrl.push(SalesInvoiceViewPage, params);
  }
  
}
