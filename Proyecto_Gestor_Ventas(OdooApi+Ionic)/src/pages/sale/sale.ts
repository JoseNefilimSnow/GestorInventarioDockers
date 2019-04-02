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
import {
  NgIf
} from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {
  //Variables obtenidas de inputs
  Nif;
  Swtch = true;
  Prod_ref;
  Quantity = 1;

  //Variables obtenidas de odoo
  partner_id;
  order_id;
  order_line_id;
  account_invoice_id;
  account_line_id;
  order_name;
  
  //Variables auxiliares 
  private order_line_index:number = 0;
  private account_line_index:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private odooRpc: OdooJsonRpc, private utils: Utils) {}

  //** Metodos para la creación de una venta */

  /**
   * El método "checkUser" te comprueba que el Nif del cliente introducido coincide con el de un cliente existente en Odoo y llama a 
   * "createSale" y crea una venta vacia sobre el mismo
   */
  private checkUser() {
    if (this.Nif.length == 9) {
      this.utils.presentLoading("Cargando..." + "\n" + "Por Favor, Espere.")
      let patrn = [
        ["vat", "=", this.Nif]
      ];
      this.odooRpc.searchRead('res.partner', patrn, [], 0, 0, "").then((res: any) => {
        this.partner_id = JSON.parse(res._body)["result"].records[0].id;
        this.Swtch = false;
        this.utils.dismissLoading();
        this.createSale();
      }).catch(err => {
        this.utils.presentToast(
          "El usuario no existe",
          2000,
          true,
          "top"
        );
        this.Swtch = true;
        this.utils.dismissLoading();
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
  /**
   * Crea venta para el cliente anteriormente recogido.
   */
  private createSale() {
    this.utils.presentLoading("Creando Venta");
    //Para crear una venta solo necesitamos tener el id del usuario, posteriormente crearemos los productos en su interior.
    this.odooRpc.createRecord('sale.order', {
      partner_id: this.partner_id
    }).then((res: any) => {
      this.order_id = JSON.parse(res._body)["result"];
      let patrn = [
        ["id", "=", JSON.parse(res._body)["result"]]
      ];
      this.utils.dismissLoading();
      this.utils.presentLoading("Finalizando detalles");
      this.odooRpc.searchRead('sale.order', patrn, [], 0, 0, "").then((res: any) => {
        this.order_name =JSON.parse(res._body)["result"].records[0].name;
        this.utils.dismissLoading();
      })

    }).catch((err: any) => {
      this.utils.dismissLoading();
      alert(err);
    });
    this.odooRpc.createRecord('account.invoice', {
      origin: this.order_name,
      partner_id: this.partner_id
    }).then((res: any) => {
      this.account_invoice_id = JSON.parse(res._body)["result"];
      this.utils.dismissLoading();
    }).catch((err: any) => {
      alert(err);
    });
  }

  //** Metodos para asignar productos a la venta*/

  /**
   *  Este metodo se encarga de buscar un producto con 
   *  la referancia pasada por parametro y aadirlo a una venta
   */

  private addProdToSale() {
    this.utils.presentLoading("Cargando..." + "\n" + "Por Favor, Espere.")
    let patrn = [
      ["default_code", "=", this.Prod_ref]
    ];
    this.odooRpc.searchRead('product.template', patrn, [], 0, 0, "").then((res: any) => {
      this.utils.dismissLoading();
      let product_id = Number(JSON.parse(res._body)["result"].records[0].id);
      this.createAccountOrderLine(product_id, this.order_line_index);
      this.createSaleOrderLine(product_id,this.order_line_index);
    }).catch(err => {
      this.utils.dismissLoading();
      this.utils.presentToast(
        "El producto no existe",
        2500,
        true,
        "top"
      );
    });
  }

  private createSaleOrderLine(product_id: Number,aux:number) {
    this.order_line_index=aux+1;
    this.odooRpc.createRecord('sale.order.line', {
      order_id: this.order_id,
      product_id: product_id,
      product_uom_qty: this.Quantity
    }).then((res: any) => {
      this.order_line_id[this.order_line_index-1] = JSON.parse(res._body)["result"];
      this.utils.dismissLoading();
    }).catch((err: any) => {
      alert(err);
    });
    this.Prod_ref = null;
    this.Quantity = 1;
  }

  private  createAccountOrderLine(product_id: Number,aux:number){
    this.account_line_index=aux+1;
    this.odooRpc.createRecord('account.invoice.line', {
      origin: this.order_name,
      partner_id: this.partner_id,
      product_id: product_id,
      quantity: this.Quantity
    }).then((res: any) => {
      this.account_line_id[this.account_line_index-1] = JSON.parse(res._body)["result"];
      this.utils.dismissLoading();
    }).catch((err: any) => {
      alert(err);
    });
  }

  private endSale() {
    this.odooRpc.updateRecord('sale.order', this.order_id, {
      state: "sale"
    });
    this.odooRpc.updateRecord('sale.order',this.account_invoice_id,{
      state:"open"
    })
    this.Nif = null;
    this.order_id = null;
    this.Swtch = true;
    this.Prod_ref = null;
    this.Quantity = 1;
    this.utils.presentToast(
      "Venta Realizada con exito",
      3000,
      true,
      "top"
    );
  }

  private logOut() {
    localStorage.removeItem("token");
    this.navCtrl.setRoot(LoginPage);
  }
}
