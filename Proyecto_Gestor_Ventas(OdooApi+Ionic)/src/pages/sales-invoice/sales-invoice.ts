import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from "../../services/utils";
import { ViewPage } from "../view/view";
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
    origin: string;
  }> = [];

  private items: Array<{
    id: number;
    origin: string;
  }> = [];

  private account = "account.invoice";

  constructor(public navCtrl: NavController, public navParams: NavParams, private odooRpc: OdooJsonRpc, private network: Network, private utils: Utils) {
    this.display();
  }

  private display(): void {
    this.utils.presentLoading("Cargando ...");
    this.odooRpc
      .getRecord(this.account, [], [], 0, 0, "")
      .then((account: any) => {
        this.utils.dismissLoading();
        this.fillParners(account);
      });
  }

  private fillParners(account: any): void {
    let json = JSON.parse(account._body);
    if (!json.error) {
      let query = json["result"].records;

      for (let i in query) {
        this.accountArray.push({
          id: query[i].id,
          origin: query[i].origin == false ? "N/A" : query[i].origin,
        });
      }
    }
  }

  private view(idx: number): void {
    let params = {
      id: this.accountArray[idx].id
    };
    this.navCtrl.push(ViewPage, params);
  }

  initializeItems(): void {
    this.accountArray = this.items;
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

    this.accountArray = this.accountArray.filter(v => {
      if (v.origin && q) {
        if (v.origin.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.items.length);
  }

  private delete(idx: number) {
    this.odooRpc.deleteRecord(this.account, this.accountArray[idx].id);
    this.utils.presentToast(
      this.accountArray[idx].origin + " Borrado con Exito",
      2000,
      true,
      "top"
    );
    this.accountArray.splice(idx, 1);
  }
}
