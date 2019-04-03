import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
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
import {
  CompileAnimationStateDeclarationMetadata
} from '@angular/compiler';
import {
  checkAvailability
} from '@ionic-native/core';

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {

  //Variables recogidas de la app:
  private Nif; //Nif del cliente
  private Prod_ref; //Referencia del producto
  private Quantity = 1; //Cantidad del producto
  private Swtch = true; //Boolean que controla la visibilidad del contenedor con entradas del producto
  //Variables recogidas de Odoo:
  private
  private partner_id; // Id de cliente
  private order_id; // Id de la venta
  private order_name; // Nombre de la venta
  private order_date; //Fecha de creación de la venta
  private invoice_id // Id de la factura
  private product_id;//Id de product
  private product_name;//Nombre del producto
  private product_price;//Precio del product
  //Variables auxiliares
  private bool: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private odooRpc: OdooJsonRpc, private utils: Utils,public alert: AlertController) {}

  //** Los siguientes metodos crearan las bases de la venta en odoo */

  F
  /**
   * El método siguiente prueba si existe el usuario y crea la venta.
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
   * Creo la venta en odoo como presupuesto vacio correspondiente al cliente anterior.
   */
  private createSale() {
    this.utils.presentLoading("Creando Venta");
    //Para crear una venta solo necesitamos tener el id del usuario, posteriormente crearemos los productos en su interior.
    this.odooRpc.createRecord('sale.order', {
      partner_id: this.partner_id
    }).then((res: any) => {
      this.order_id = JSON.parse(res._body)["result"];
      this.utils.dismissLoading();
      // this.getAttributesOrder(); //Metodo auxiliar para obtener atributos
    }).catch((err: any) => {
      this.utils.dismissLoading();
      alert(err);
    });
  }
  /**
   * Metodo auxiliar para obtener atributos de venta
   */
  // private getAttributesOrder() {
  //   this.utils.presentLoading("Recogiendo datos");
  //   let patrn = [
  //     ["id", "=", this.order_id]
  //   ];
  //   this.odooRpc.searchRead('sale.order', patrn, [], 0, 0, "").then((res: any) => {
  //     this.order_name = JSON.parse(res._body)["result"].records[0].name;
  //     this.order_date = JSON.parse(res._body)["result"].records[0].date_order;
  //     this.createAccountInvoice();
  //     this.utils.dismissLoading();
  //   }).catch(err => {
  //     this.utils.dismissLoading();
  //     alert(err)
  //   });
  // }

  /**
   * Creo la factura en odoo como borrador vacio que corresponde al cliente anterior y el documento de origen es la venta hecha.
   */
  // private createAccountInvoice() {
  //   console.log("En createInvoice: " + this.order_name)
  //   //Para crear una venta solo necesitamos tener el id del usuario, posteriormente crearemos los productos en su interior.
  //   this.odooRpc.createRecord('account.invoice', {
  //     origin: this.order_name,
  //     partner_id: this.partner_id
  //   }).then((res: any) => {
  //     this.invoice_id = JSON.parse(res._body)["result"];
  //   }).catch((err: any) => {
  //     alert(err);
  //   });
  // }

  //** Habiendo finalizado los metodos anteriores y con los datos pilares asignados, procedemos a la creación de métodos que asignarán valores a los objetos creados. */

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
      this.product_id = Number(JSON.parse(res._body)["result"].records[0].id);
      this.product_name = String(JSON.parse(res._body)["result"].records[0].name);
      this.product_price = Number(JSON.parse(res._body)["result"].records[0].list_price);
      // let boolean = this.checkAviability();
      this.createSaleOrderLine();
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

  // private checkAviability() {
  //   let params = [
  //     ['product_id', '=', this.product_id]
  //   ];
  //   this.odooRpc.searchRead('stock.inventory.line', params, ["id", "location_id", "product_qty"], 0, 0, "").then((res: any) => {
  //     if (JSON.parse(res._body)["result"].records.length == 1) {
  //       let id_inv = JSON.parse(res._body)["result"].records[0].id;
  //       let quantityInStock = JSON.parse(res._body)["result"].records[0].product_qty;
  //       if (quantityInStock>=this.Quantity) {
  //         this.odooRpc.updateRecord('stock.inventory.line',id_inv,{
  //           product_qty: quantityInStock-this.Quantity
  //         })
  //         this.odooRpc.updateRecord('product.template',this.product_id,{
  //           qty_avaialable: quantityInStock-this.Quantity,
  //           virtual_avaialable:  quantityInStock-this.Quantity
  //         })

  //       } else {
  //         let alrt = this.alert.create({
  //           title: "Alerta del Almacen: ",
  //           message: "No existen productos suficientes en el inventario",
  //           buttons: ["Ok"]
  //         });
  //         alrt.present();
  //       }
  //     }else{
  //       console.log("Todavia por tratar la aparición de mas de un inventario sobre el producto")
  //     }
  //   }).catch(err => {
  //     alert(err);
  //   });
  // }

  /**
   * Este método crea una linea que contiene los prodcutos y se asignan a la venta anterior junto a la cantidad del mismo
   */
  private createSaleOrderLine() {
    this.odooRpc.createRecord('sale.order.line', {
      order_id: this.order_id,
      product_id: this.product_id,
      product_uom_qty: this.Quantity
    }).then((res: any) => {
      // this.createInvoiceLine();
      this.utils.dismissLoading();
    }).catch((err: any) => {
      alert(err);
    });
    this.Prod_ref = null;
    this.Quantity = 1;
  }
  /**
   * Método que crea una linea de productos que estarán presentes en la factura de venta anteriormente creada. 
   */
  // private createInvoiceLine() {
  //   this.odooRpc.createRecord('account.invoice.line', {
  //     name: this.product_name,
  //     invoice_id: this.invoice_id,
  //     product_id: this.product_id,
  //     quantity: this.Quantity,
  //     partner_id: this.partner_id,
  //     account_id: 480,
  //     price_unit: this.product_price
  //   }).then((res: any) => {
  //     console.log(JSON.stringify(res));
  //     this.utils.dismissLoading();
  //   }).catch((err: any) => {
  //     alert(err);
  //   });
  //   this.Prod_ref = null;
  //   this.Quantity = 1;
  // }

  /**
   * Este método finaliza la venta y la cambia de estado junto a la factura y resetea los valores a sus valores por defecto preaparados para realizar la siguiente venta
   */
  private endSale() {
    this.odooRpc.updateRecord('sale.order', this.order_id, {
      state: "sale"
    });
    this.odooRpc.call('sale.order',"action_invoice_create",[this.order_id],null).then((res:any)=>{
      console.log(JSON.parse(res._body))
    });
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

  /**
   * El método cancela toda operación realizada hasta el momento borrandolas
   */
  private cancelSale() {
    this.odooRpc.deleteRecord('sale.order', this.order_id);
    this.Nif = null;
    this.order_id = null;
    this.Swtch = true;
    this.Prod_ref = null;
    this.Quantity = 1;
    this.utils.presentToast(
      "Venta Cancelada",
      3000,
      true,
      "top"
    );
  }

  /**
   * Metodo que permite cerrar la sesión actual
   */
  private logOut() {
    localStorage.removeItem("token");
    this.navCtrl.setRoot(LoginPage);
  }
}
