import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OdooJsonRpc } from "../../services/odoojsonrpc";
import { Utils } from "../../services/utils";

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  private invoice_id: number;
  private origin: string;
  private state: string;
  private date_invoice: string;
  private date_due: string;
  private partner_id: number;

  public data: Array<{
    id: number;
    origin: string;
    state: string;
    date_invoice: string;
    date_due: string;
    partner_id: number;
  }> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public odooRpc: OdooJsonRpc, public utils: Utils) {
    this.invoice_id = navParams.get("id");
    this.display();
  }

  private display(): void {
    this.utils.presentLoading("Cargando...");
    let account = "account.invoice";
    let fields = [
      "origin",
      "state",
      "date_invoice",
      "date_due",
      "partner_id"
    ];
    let domain = [["id", "=", this.invoice_id]];
    let sort = "";
    let limit = 0;
    let offset = 0;
    this.odooRpc
      .searchRead(account, domain, fields, limit, offset, sort)
      .then((res: any) => {
        this.utils.dismissLoading();
        let data = JSON.parse(res._body)["result"].records;
        for (let record in data) {
          this.origin = data[record].origin == false ? "N/A" : data[record].origin;
          this.state = data[record].state == false ? "N/A" : data[record].state;
          this.date_invoice = data[record].date_invoice == false ? "N/A" : data[record].date_invoice;
          this.date_due = data[record].date_due == false ? "N/A" : data[record].date_due;
          this.partner_id = data[record].partner_id == false ? "N/A" : data[record].partner_id;
          this.data.push({
            id: data[record].id,
            origin: data[record].origin,
            state: data[record].state == false ? "N/A" : data[record].state,
            date_invoice: data[record].date_invoice == false ? "N/A" : data[record].date_invoice,
            date_due: data[record].date_due == false ? "N/A" : data[record].date_due,
            partner_id: data[record].partner_id == false ? "N/A" : data[record].partner_id
          });
        }
      });
  }
  private statusPayed(){
    this.odooRpc.updateRecord('account.invoice',this.invoice_id,{
      state:"payed"
    })
  }

}
