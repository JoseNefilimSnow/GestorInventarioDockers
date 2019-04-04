import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OdooJsonRpc } from "../../services/odoojsonrpc";
import { Utils } from "../../services/utils";

@IonicPage()
@Component({
  selector: 'page-transfers-view',
  templateUrl: 'transfers-view.html',
})
export class TransfersViewPage {

  private transf_id: number;
  private picking_type_id: number;
  private origin: string;
  private reference: string;
  private name: string;
  private ordered_qty: number;
  private partner_id: number;

  public data: Array<{
    id: number;
    picking_type_id: number;
    origin: string;
    reference: string;
    name: string;
    ordered_qty: string;
    partner_id: number;
  }> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public odooRpc: OdooJsonRpc, public utils: Utils) {
    this.transf_id = navParams.get("id");
    this.display();
  }

  private display(): void {
    this.utils.presentLoading("Cargando...");
    let transf = "stock.move";
    let fields = [
      "origin",
      "reference",
      "name",
      "ordered_qty",
      "partner_id",
      "picking_type_id"

    ];
    let domain = [["id", "=", this.transf_id]];
    let sort = "";
    let limit = 0;
    let offset = 0;
    this.odooRpc
      .searchRead(transf, domain, fields, limit, offset, sort)
      .then((res: any) => {
        this.utils.dismissLoading();
        let data = JSON.parse(res._body)["result"].records;


        for (let record in data) {
          this.origin = data[record].origin == false ? "N/A" : data[record].origin;
          this.reference = data[record].reference == false ? "N/A" : data[record].reference;
          this.name = data[record].name == false ? "N/A" : data[record].name;
          this.ordered_qty = data[record].ordered_qty == false ? "N/A" : data[record].ordered_qty;
          this.partner_id = data[record].partner_id == false ? "N/A" : data[record].partner_id;
          this.picking_type_id = data[record].picking_type_id == false ? "N/A" : data[record].picking_type_id;
          this.data.push({
            id: data[record].id,
            origin: data[record].origin,
            reference: data[record].reference == false ? "N/A" : data[record].reference,
            name: data[record].name == false ? "N/A" : data[record].name,
            ordered_qty: data[record].ordered_qty == false ? "N/A" : data[record].ordered_qty,
            partner_id: data[record].partner_id == false ? "N/A" : data[record].partner_id,
            picking_type_id: data[record].picking_type_id == false ? "N/A" : data[record].picking_type_id
          });
        }
      });

  }
}
