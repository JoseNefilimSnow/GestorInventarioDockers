import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  LoginPage
} from "../login/login";
import {
  Utils
} from "../../services/utils"
import {
  OdooJsonRpc
} from '../../services/odoojsonrpc';

/**
 * Generated class for the SalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {
  swtch: Boolean = true;
  nif: string;
  partner_id:Number;
  order_id:Number;
  default_code:string;
  product_id:Number;
  product_uom_qty:Number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private odooRpc: OdooJsonRpc, private utils: Utils) {}
  private checkUser() {
    this.utils.presentLoading("Cargando..."+"\n"+"Por Favor, Espere.")
    let patrn = [
      ["vat", "=", this.nif]
    ];
    this.odooRpc.searchRead('res.partner', patrn, [], 0, 0, "").then((res: any) => {
      this.partner_id = JSON.parse(res._body)["result"].records[0].id;
      if (Number.parseInt(JSON.parse(res._body)["result"].records[0].id)) {
        this.swtch = false;
        this.utils.dismissLoading();
        this.createSale()
      } else {
        this.utils.presentToast(
          "El usuario no existe",
          2000,
          true,
          "top"
        );
        this.swtch = true;
        this.utils.dismissLoading();
      }
    }).catch(err => {
      this.utils.presentToast(
        "El usuario no existe",
        2000,
        true,
        "top"
      );
      this.swtch = true;
      this.utils.dismissLoading();
    })
  }

  private createSale(){
    this.utils.presentLoading("Creando Venta");
    this.odooRpc.createRecord('sale.order',{partner_id:this.partner_id}).then((res:any) =>{
      console.log(JSON.parse(res._body)["result"]);
      this.utils.dismissLoading();
      this.order_id = JSON.parse(res._body)["result"];
    }).catch((err:any)=>{
      alert(err);
    });
  }

  private addProdToSale(){
    this.utils.presentLoading("Cargando..."+"\n"+"Por Favor, Espere.")
    let patrn = [
      ["default_code", "=", this.default_code]
    ];
    this.odooRpc.searchRead('product.template', patrn, [], 0, 0, "").then((res: any) => {
      this.product_id = JSON.parse(res._body)["result"].records[0].id;
      if (Number.parseInt(JSON.parse(res._body)["result"].records[0].id)) {
        this.swtch = false;
        this.utils.dismissLoading();
        this.createSaleOrderLine()
      } else {
        this.utils.presentToast(
          "El usuario no existe",
          2000,
          true,
          "top"
        );
        this.swtch = true;
        this.utils.dismissLoading();
      }
    }).catch(err => {
      this.utils.presentToast(
        "El usuario no existe",
        2000,
        true,
        "top"
      );
      this.swtch = true;
      this.utils.dismissLoading();
    })
  }
  private createSaleOrderLine(){
    this.utils.presentLoading("Finalizando detalles");
    this.odooRpc.createRecord('sale.order.line',{order_id:this.order_id, product_id: this.product_id,product_uom_qty:this.product_uom_qty}).then((res:any) =>{
      this.utils.dismissLoading();
      this.utils.presentToast(
        "Venta Realizada con exito",
        3000,
        true,
        "top"
      );
      let id = Number.parseInt(this.order_id+"");
      this.odooRpc.updateRecord('sale.order',id,{state:"sale"})
        this.swtch= true;
        this.nif=null;
        this.partner_id=null;
        this.order_id=null;
        this.default_code=null;
        this.product_id=null;
        this.product_uom_qty=null;
    }).catch((err:any)=>{
      alert(err);
    });
  }
  private logOut() {
    localStorage.removeItem("token");
    this.navCtrl.setRoot(LoginPage);
  }

}
