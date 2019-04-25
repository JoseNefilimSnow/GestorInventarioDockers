import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  OdooJsonRpc
} from "../../services/odoojsonrpc";
import {
  Utils
} from "../../services/utils";
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-sale-invoice-view',
  templateUrl: 'sales-invoice-view.html',
})
export class SalesInvoiceViewPage {

  private invoice_id: number;
  private origin: string;
  private state: string;
  private date_invoice: string;
  private date_due: string;
  private partner_id: number;
  private e: boolean;
  private t: boolean;
  private Swtch: boolean;
  private Swtch_1:boolean;

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

  ionViewDidLoad() {

  }
  ef(){
    this.e=true;
    this.Swtch_1=true;
  }
  tar(){
      this.t=true;
      this.Swtch_1=true;
  }
  private display(): void {
    this.odooRpc.getRecord("account.invoice", [["id", "=", this.invoice_id]], [], 0, 0, "").then((res: any) => {
      this.checkState(this.state = JSON.parse(res._body)["result"].records[0].state);
    });
    this.utils.presentLoading("Cargando...");
    this.odooRpc
      .getRecord("account.invoice", [
        ["id", "=", this.invoice_id]
      ], [
          "origin",
          "state",
          "date_invoice",
          "date_due",
          "partner_id"
        ], 0, 0, "")
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

  private checkState(state: string) {
    console.log(state === "paid");
    if (state === "paid") {
      this.Swtch = true;
      this.Swtch_1= true;
    } else {
      this.Swtch = false;
      this.Swtch_1= false;
    }
  }

  private statusPayed() {
    console.log("Id de ventas" + this.invoice_id)
    console.log(this.e);
    console.log(this.t);
    if (this.e) {
      this.odooRpc.validateAndPay(this.invoice_id, 7);
    } else if (this.t) {
      this.odooRpc.validateAndPay(this.invoice_id, 8);
    } else {
      console.log("No esta seleccionada ninguna opcion");
    }
    this.Swtch=true;
  }

}
