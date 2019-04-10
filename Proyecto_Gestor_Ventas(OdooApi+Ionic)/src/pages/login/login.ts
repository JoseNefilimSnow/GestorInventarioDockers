import {
  ClientsPage
} from "../clients/clients";
import {
  OdooJsonRpc
} from "../../services/odoojsonrpc";
import {
  Component
} from "@angular/core";
import {
  NavController,
  NavParams
} from "ionic-angular";
import {
  Utils
} from "../../services/utils";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  public odooUrl = "http://172.18.8.127:8069";
  private selectedDatabase = "ValperApp1";
  private email; 
  private password;
  private advTools: Boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private odooRpc: OdooJsonRpc,
    private utils: Utils
  ) {

  }

  public reinit() {
    this.odooRpc.init({
      odoo_server: this.odooUrl,
      http_auth: "username:password"
    });
  }
  private login() {
    this.utils.presentLoading("Iniciando Sesión", 0, true);
    this.odooRpc
      .login(this.selectedDatabase, this.email, this.password)
      .then((res: any) => {
        console.log(JSON.parse(res._body)["result"].partner_id);
        if (Number(JSON.parse(res._body)["result"].partner_id)) {
          let logiData: any = JSON.parse(res._body)["result"];
          logiData.password = this.password;
          localStorage.setItem("token", JSON.stringify(logiData));
          this.utils.dismissLoading();
          this.navCtrl.setRoot(ClientsPage);
        } else {
          this.utils.dismissLoading();
          this.utils.presentAlert(
            "Error",
            "El usuario no existe",
            [{
              text: "Ok"
            }]
          );
        }

      })
      .catch(err => {
        this.utils.dismissLoading();
        this.utils.presentAlert(
          "Error",
          "El usuario o contraseña deben ser incorrectos",
          [{
            text: "Ok"
          }]
        );
      });
  }
  private advancedTools() {
    if (this.advTools) {
      this.advTools = false;
    } else {
      this.advTools = true;
    }
  }
  private setIp() {
    this.odooUrl = this.odooUrl;
    this.advancedTools();
  }
}
