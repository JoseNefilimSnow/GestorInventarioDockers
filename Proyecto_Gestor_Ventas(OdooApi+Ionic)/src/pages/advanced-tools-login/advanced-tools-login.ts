import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import {
  OdooJsonRpc
} from "../../services/odoojsonrpc";
import {
  LoginPage
} from "../login/login";
/**
 * Generated class for the AdvancedToolsLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advanced-tools-login',
  templateUrl: 'advanced-tools-login.html',
})
export class AdvancedToolsLoginPage {
  public odooUrl = "http://172.18.8.25:8069";

  constructor(public viewCtrl: ViewController, private odooRpc : OdooJsonRpc) {
  }
  setUp() {
    this.viewCtrl.dismiss();
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
