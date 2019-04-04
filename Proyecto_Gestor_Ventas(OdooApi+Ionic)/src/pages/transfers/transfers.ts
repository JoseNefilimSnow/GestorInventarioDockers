import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from "../../services/utils";
import { TransfersViewPage } from "../transfers-view/transfers-view";
import { OdooJsonRpc } from "../../services/odoojsonrpc";
import { Network } from "@ionic-native/network";

@IonicPage()
@Component({
  selector: 'page-transfers',
  templateUrl: 'transfers.html',
})
export class TransfersPage {

  private transfArray: Array<{
    id: number;
    reference: string;
    origin: string;
    picking_type_id: number;
  }> = [];

  private items: Array<{
    id: number;
    reference: string;
    origin: string;
    picking_type_id: number;
  }> = [];

  private transf = "stock.move";

  constructor(public navCtrl: NavController, public navParams: NavParams, private odooRpc: OdooJsonRpc, private network: Network, private utils: Utils) {
    this.display();
  }

  private display(): void {
    this.utils.presentLoading("Cargando ...");
    this.odooRpc
      .searchRead(this.transf, [["picking_type_id", "!=", null]], [], 0, 0, "")
      .then((transf: any) => {
        this.utils.dismissLoading();
        this.fillParners(transf);
      });
  }

  private fillParners(transf: any): void {
    let json = JSON.parse(transf._body);
    if (!json.error) {
      let query = json["result"].records;

      for (let i in query) {
        this.transfArray.push({
          id: query[i].id,
          reference: query[i].reference == false ? "N/A" : query[i].reference,
          origin: query[i].origin == false ? "N/A" : query[i].origin,
          picking_type_id: query[i].picking_type_id == false ? "N/A" : query[i].picking_type_id
        });
      }
    }
  }

  private view(idx: number): void {
    let params = {
      id: this.transfArray[idx].id
    };
    this.navCtrl.push(TransfersViewPage, params);
  }

  initializeItems(): void {
    this.transfArray = this.items;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.transfArray = this.transfArray.filter(v => {
      if (v.reference && q) {
        if (v.reference.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.items.length);
  }
}
