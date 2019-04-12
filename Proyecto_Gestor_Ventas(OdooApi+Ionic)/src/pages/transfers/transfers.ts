import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from 'ionic-angular';
import {
  Utils
} from "../../services/utils";
import {
  TransfersViewPage
} from "../transfers-view/transfers-view";
import {
  OdooJsonRpc
} from "../../services/odoojsonrpc";
import {
  Network
} from "@ionic-native/network";

@IonicPage()
@Component({
  selector: 'page-transfers',
  templateUrl: 'transfers.html',
})
export class TransfersPage {

  private transfArray: Array < {
    id: number;
    reference: string;
    origin: string;
    picking_type_id: number;
  } > = [];


  constructor(public navCtrl: NavController, private menu: MenuController, public navParams: NavParams, private odooRpc: OdooJsonRpc, private network: Network, private utils: Utils) {
    this.menu.swipeEnable(true);
    this.display();
  }
  /** Estos métodos guardan en el array a mostrar los elementos de la tabla de Transferencias */

  /**
   * Aqui se muestran las respuestas del servidor dentro de la tabla Transferencias y llama al método para rellenar array
   */
  private display(): void {
    this.utils.presentLoading("Cargando ...");
    this.odooRpc
      .getRecord("stock.move", [
        ["picking_type_id", "!=", null]
      ], [], 0, 0, "")
      .then((transf: any) => {
        this.utils.dismissLoading();
        this.fillParners(transf);
      });
  }

  private fillParners(transf: any): void {
    let json = JSON.parse(transf._body);
    if (!json.error) {
      let data = json["result"].records;

      for (let i in data) {
        this.transfArray.push({
          id: data[i].id,
          reference: data[i].reference == false ? "N/A" : data[i].reference,
          origin: data[i].origin == false ? "N/A" : data[i].origin,
          picking_type_id: data[i].picking_type_id == false ? "N/A" : data[i].picking_type_id
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
}
