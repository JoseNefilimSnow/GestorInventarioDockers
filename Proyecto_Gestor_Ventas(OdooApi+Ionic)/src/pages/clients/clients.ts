import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  Utils
} from "../../services/utils";
import {
  OdooJsonRpc
} from "../../services/odoojsonrpc";
import {
  Network
} from "@ionic-native/network";
import {
  SalePage
} from "../sale/sale";
import { textDef } from '@angular/core/src/view';
/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  partner_id:number;
  Nif:string;
  Name:string;
  private clients: Array < {
    id: number;
    name: string;
  } > = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private odooRpc: OdooJsonRpc, private network: Network, private utils: Utils) {
    this.display();
  }

  
  /**
   * El método siguiente prueba si existe el usuario y crea la venta.
   */
  private checkUser() {
    if (this.Nif.length == 9) {
      this.utils.presentLoading("Cargando..." + "\n" + "Por Favor, Espere.")
      let patrn = [
        ["vat", "=", this.Nif]
      ];
      this.odooRpc.getRecord('res.partner', patrn, [], 0, 0, "").then((res: any) => {
        this.partner_id = JSON.parse(res._body)["result"].records[0].id;
        this.utils.dismissLoading();
        this.view(this.partner_id);
      }).catch(err => {
        this.utils.presentAlert("Usuario no enontrado",
          "El usuario no existe,¿Desea crearlo?",[{
            text: "Crear",
            handler : create =>{
              this.odooRpc.createRecord('res.partner',{
                vat:this.Nif,
                name:create.Name
              });
            }
          }],"",true,[{
            name: 'Name',
            placeholder: 'Nombre',
            type:"text",
            required:true
          }]
        );
        this.odooRpc.getRecord('res.partner', patrn, [], 0, 0, "").then((res: any) => {
          this.partner_id = JSON.parse(res._body)["result"].records[0].id;
          this.view(this.partner_id);
        });
      })
    } else {
      this.utils.presentToast(
        "El NIF introducido no es correcto",
        2000,
        true,
        "top"
      );
    }
  }


  /** Estos métodos guardan en el array a mostrar los elementos de la tabla de Clientes */

  /**
   * Aqui se muestran las respuestas del servidor dentro de la tabla Clientes y llama al método para rellenar array
   */

  private display(): void {
    this.utils.presentLoading("Cargando ...");
    this.odooRpc
      .getRecord('res.partner', [], [], 0, 0, "")
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
        this.clients.push({
          id: data[i].id,
          name: data[i].name == false ? "N/A" : data[i].name,
        });
      }
    }
  }

  /** 
   * Método que te abre cada instancia de Clientes
   */

  private view(idx: number): void {
    let params = {
      id: this.clients[idx].id
    };
    this.navCtrl.push(SalePage, params);
  }

}
