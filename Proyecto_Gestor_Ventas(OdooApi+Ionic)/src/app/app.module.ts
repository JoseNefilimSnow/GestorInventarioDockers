import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { LoginPage } from "../pages/login/login";
import { SalePage } from "../pages/sale/sale";
import { SalesInvoicePage } from "../pages/sales-invoice/sales-invoice";
import { MyApp } from "./app.component";
import { Network } from "@ionic-native/network";
import { OdooJsonRpc } from "../services/odoojsonrpc";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { ViewPage } from "../pages/view/view";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SalePage,
    SalesInvoicePage,
    ViewPage
  ],
  imports: [BrowserModule, HttpModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SalePage,
    SalesInvoicePage,
    ViewPage
  ],
  providers: [
    Network,
    StatusBar,
    SplashScreen,
    OdooJsonRpc,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
