import { LoginPage } from "../pages/login/login";
import { OdooJsonRpc } from "../services/odoojsonrpc";
import { Component, ViewChild } from "@angular/core";
import { Nav, AlertController, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { Network } from "@ionic-native/network";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Utils } from "../services/utils";
import { SalePage } from "../pages/sale/sale";
import { SalesInvoicePage } from "../pages/sales-invoice/sales-invoice";

@Component({
  templateUrl: "app.html",
  providers: [OdooJsonRpc, Utils]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array < {
    title: string,
    component: any
  } > ;
  constructor(
    platform: Platform,
    private statusBar: StatusBar,
    splashScreen: SplashScreen,
    public odooRpc: OdooJsonRpc,
    public alert: AlertController,
    private network: Network
  ) {
    platform.ready().then(() => {
      splashScreen.hide();
      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);

      // set status bar to color
      this.statusBar.backgroundColorByHexString("#3b73f7");
    });

    if (localStorage.getItem("token")) {
      let response = localStorage.getItem("token");

      let jsonData = JSON.parse(response);
      let username = jsonData["username"];
      let pass = jsonData["password"];
      let url = jsonData["web.base.url"];
      let db = jsonData["db"];

      this.odooRpc.init({
        odoo_server: url,
        http_auth: "username:password"
      });
      this.odooRpc.login(db, username, pass).catch((error: any) => {
        let alrt = this.alert.create({
          title: "Estado del Servidor",
          message: "La conexión a " + url + " se ha cancelado",
          buttons: ["Ok"]
        });
        alrt.present();
      });
      this.rootPage = SalePage;
    }
    this.pages = [{
      title: 'Página De Ventas',
      component: SalePage
    }],[{
      title:'Facturas',
      component: SalesInvoicePage
    }];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
