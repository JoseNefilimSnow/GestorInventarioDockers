import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  MenuController
} from 'ionic-angular';
import {
  ClientsPage
} from "../clients/clients";
import {
  Utils
} from "../../services/utils"
import {
  OdooJsonRpc
} from '../../services/odoojsonrpc';

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {

  //Variables recogidas de la app:
  private Prod_ref; //Referencia del producto
  private Quantity = 1; //Cantidad del producto
  // private Swtch = true; //Boolean que controla la visibilidad del contenedor con entradas del producto
  //Variables recogidas de Odoo:
  private
  private partner_id; // Id de cliente
  private order_id; // Id de la venta
  private order_name; // Nombre de la venta
  private order_date; //Fecha de creación de la venta
  private invoice_id // Id de la factura
  private product_id; //Id de product
  private product_name; //Nombre del producto
  private product_price; //Precio del product
  private payment_id; //Id payment
  //Variables auxiliares
  private bool: boolean;

  constructor(public navCtrl: NavController,private menu:MenuController, public navParams: NavParams, private odooRpc: OdooJsonRpc, private utils: Utils, public alert: AlertController) {
    this.partner_id = navParams.get("id");
    this.menu.swipeEnable(true);
    console.log("Cliente a tratar: "+ this.partner_id)
    this.createSale();
  }

  //** Los siguientes metodos crearan las bases de la venta en odoo */

  /**
   * Creo la venta en odoo como presupuesto vacio correspondiente al cliente anterior.
   */
  private createSale() {
    this.utils.presentLoading("Creando Venta");
    //Para crear una venta solo necesitamos tener el id del usuario. Posteriormente crearemos los productos en su interior.
    this.odooRpc.createRecord('sale.order', {
      partner_id: this.partner_id
    }).then((res: any) => {
      this.order_id = JSON.parse(res._body)["result"];
      this.utils.dismissLoading();
      console.log("Venta:" + JSON.parse(res._body))
      this.getAttributesOrder(); //Metodo auxiliar para obtener atributos
    }).catch((err: any) => {
      this.utils.dismissLoading();
      alert(err);
    });
  }

  /**
   * Metodo auxiliar para obtener atributos de venta
   */

  private getAttributesOrder() {
    this.utils.presentLoading("Recogiendo datos");
    let patrn = [
      ["id", "=", this.order_id]
    ];
    this.odooRpc.getRecord('sale.order', patrn, [], 0, 0, "").then((res: any) => {
      console.log(JSON.parse(res._body));
      this.order_name = JSON.parse(res._body)["result"].records[0].name;
      this.order_date = JSON.parse(res._body)["result"].records[0].date_order;
      this.createAccountInvoice();
      this.utils.dismissLoading();
    }).catch(err => {
      this.utils.dismissLoading();
      alert(err)
    });
  }

  /**
   * Creamos una Factura que se vinculará a la venta
   */

  private createAccountInvoice() {
    //Para crear una venta solo necesitamos tener el id del usuario, el documento de origen y la fecha de la venta. Posteriormente crearemos los productos en su interior.
    this.odooRpc.createRecord('account.invoice', {
      partner_id: this.partner_id,
      origin: this.order_name,
      date_invoice: this.order_date
    }).then((res: any) => {
      this.invoice_id = JSON.parse(res._body)["result"];
      this.utils.dismissLoading();
    }).catch((err: any) => {
      this.utils.dismissLoading();
      alert(err);
    });
  }
  //** Habiendo finalizado los metodos anteriores y con los datos pilares asignados, procedemos a la creación de métodos que asignarán valores a los objetos creados. */

  /**
   *  Este metodo se encarga de buscar un producto con 
   *  la referancia pasada por parametro y aadirlo a una venta
   */

  private addProdToSale() {
    this.utils.presentLoading("Cargando..." + "\n" + "Por Favor, Espere.")
    let patrn = [
      ["barcode", "=", this.Prod_ref]
    ];
    this.odooRpc.getRecord('product.template', patrn, [], 0, 0, "").then((res: any) => {
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
  /**
   * Este método crea una linea que contiene los prodcutos y se asignan a la venta anterior junto a la cantidad del mismo
   */
  private createSaleOrderLine() {
    this.odooRpc.createRecord('sale.order.line', {
      order_id: this.order_id,
      product_id: this.product_id,
      product_uom_qty: this.Quantity
    }).then((res: any) => {
      this.createInvoiceLine();
      this.utils.dismissLoading();
    }).catch((err: any) => {
      alert(err);
    });
  }
  /**
   * Este método crea una linea que contiene los prodcutos y se asignan a la venta anterior junto a la cantidad del mismo
   */
  private createInvoiceLine() {
    this.odooRpc.createRecord('account.invoice.line', {
      name: this.product_name,
      invoice_id: this.invoice_id,
      product_id: this.product_id,
      quantity: this.Quantity,
      partner_id: this.partner_id,
      account_id: 480,
      price_unit: this.product_price
    }).then((res: any) => {
      console.log(JSON.stringify(res));
      this.utils.dismissLoading();
    }).catch((err: any) => {
      alert(err);
    });
    this.Prod_ref = null;
    this.Quantity = 1;
  }
  /**
   * Este método finaliza la venta y la cambia de estado junto a la factura y resetea los valores a sus valores por defecto preaparados para realizar la siguiente venta
   */
  private endSale() {
    this.odooRpc.saleConfirm(this.order_id)
    this.odooRpc.createInvoiceForSale(this.invoice_id)
    this.order_id = null;
    // this.Swtch = true;
    this.Prod_ref = null;
    this.Quantity = 1;
    this.utils.presentToast(
      "Venta Realizada con exito",
      3000,
      true,
      "top"
    );
    this.navCtrl.setRoot(ClientsPage);
  }

  /**
   * El método cancela toda operación realizada hasta el momento borrandolas
   */
  private cancelSale() {
    this.odooRpc.deleteRecord('sale.order', this.order_id);
    this.order_id = null;
    // this.Swtch = true;
    this.Prod_ref = null;
    this.Quantity = 1;
    this.utils.presentToast(
      "Venta Cancelada",
      3000,
      true,
      "top"
    );
    this.navCtrl.setRoot(ClientsPage);
  }


}
