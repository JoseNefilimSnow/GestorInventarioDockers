import { SalePage } from "../sale/sale";
import { OdooJsonRpc } from "../../services/odoojsonrpc";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Utils } from "../../services/utils";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  public odooUrl="http://172.18.8.127:8069";
  private selectedDatabase="pruebaodoo";
  private email;
  private password;
  private advTools:Boolean=true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private odooRpc: OdooJsonRpc,
    private utils: Utils
  ) {

  }

  public reinit() {
    this.odooRpc.init({
      odoo_server:this.odooUrl,
      http_auth: "username:password"
    });
  }
  private login() {
    this.odooRpc
      .login(this.selectedDatabase, this.email, this.password)
      .then((res: any) => {
        let logiData: any = JSON.parse(res._body)["result"];
        logiData.password = this.password;
        localStorage.setItem("token", JSON.stringify(logiData));
        this.navCtrl.setRoot(SalePage);
      })
      .catch(err => {
        this.utils.dismissLoading();
        this.utils.presentAlert(
          "Error",
          "El usuario o contraseña deben ser incorrectas",
          [
            {
              text: "Ok"
            }
          ]
        );
      });
  }
  private advancedTools(){
    if(this.advTools){
      this.advTools=false;
    }else{
      this.advTools=true;
    }
  }
  private setIp(){
    this.odooUrl=this.odooUrl;
    this.advancedTools();
  }
}
