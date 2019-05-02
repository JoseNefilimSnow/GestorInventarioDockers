webpackJsonp([7],{

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clients_clients__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_odoojsonrpc__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_utils__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, odooRpc, utils, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.odooRpc = odooRpc;
        this.utils = utils;
        this.menu = menu;
        this.odooUrl = "http://172.18.8.25:8069";
        this.selectedDatabase = "ValperApp";
        this.advTools = true;
        this.menu.swipeEnable(false);
    }
    LoginPage.prototype.reinit = function () {
        this.odooRpc.init({
            odoo_server: this.odooUrl,
            http_auth: "username:password"
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.utils.presentLoading("Iniciando Sesión", 0, true);
        this.odooRpc
            .login(this.selectedDatabase, this.email, this.password)
            .then(function (res) {
            console.log(JSON.parse(res._body));
            if (Number(JSON.parse(res._body)["result"].partner_id)) {
                var logiData = JSON.parse(res._body)["result"];
                logiData.password = _this.password;
                localStorage.setItem("token", JSON.stringify(logiData));
                _this.utils.dismissLoading();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__clients_clients__["a" /* ClientsPage */]);
            }
            else {
                _this.utils.dismissLoading();
                _this.utils.presentAlert("Error", "El usuario no existe", [{
                        text: "Ok"
                    }]);
            }
        })
            .catch(function (err) {
            _this.utils.dismissLoading();
            _this.utils.presentAlert("Error", "El usuario o contraseña deben ser incorrectos", [{
                    text: "Ok"
                }]);
        });
    };
    LoginPage.prototype.advancedTools = function () {
        if (this.advTools) {
            this.advTools = false;
        }
        else {
            this.advTools = true;
        }
    };
    LoginPage.prototype.setIp = function () {
        this.odooUrl = this.odooUrl;
        this.advancedTools();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: "page-login",template:/*ion-inline-start:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\login\login.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title> Inicio de Sesión </ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="advancedTools()">\n\n        <ion-icon name="construct"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="background">\n\n  <div text-center>\n\n    <img src="assets/imgs/ValperApp.png" alt="No Image" />\n\n  </div>\n\n\n\n  <ion-card>\n\n    <div>\n\n      <form (ngSubmit)="login()" #registerForm="ngForm">\n\n        <div class="spacer" style="height: 10px;"></div>\n\n\n\n        <ion-item class="border-box">\n\n          <ion-input type="email" placeholder="Usuario(Email)" [(ngModel)]="email" name="email" required></ion-input>\n\n        </ion-item>\n\n        <div class="spacer" style="height: 10px;"></div>\n\n\n\n        <ion-item class="border-box">\n\n          <ion-input type="password" [(ngModel)]="password" name="pass" placeholder="Contraseña" required></ion-input>\n\n        </ion-item>\n\n        <div class="spacer" style="height: 10px;"></div>\n\n        <button ion-button block round outline type="submit" (click)="reinit()">\n\n          Iniciar Sesión\n\n        </button>\n\n      </form>\n\n    </div>\n\n  </ion-card>\n\n  <div [hidden]="advTools">\n\n    <ion-input type="text" placeholder="Url Odoo" [(ngModel)]="odooUrl" name="odooUrl" required></ion-input>\n\n    <button ion-button block round outline (click)="setIp()">\n\n      Guardar configuración\n\n    </button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__services_odoojsonrpc__["a" /* OdooJsonRpc */],
        __WEBPACK_IMPORTED_MODULE_4__services_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* MenuController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__clients_clients__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_utils__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_odoojsonrpc__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SalePage = (function () {
    function SalePage(navCtrl, menu, navParams, odooRpc, utils, alert) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.navParams = navParams;
        this.odooRpc = odooRpc;
        this.utils = utils;
        this.alert = alert;
        this.Quantity = 1; //Cantidad del producto
        //Variables auxiliares
        this.count = 0;
        this.total = 0;
        this.prodsArray = [];
        this.partner_id = navParams.get("id");
        this.menu.swipeEnable(true);
        console.log("Cliente a tratar: " + this.partner_id);
        this.createSale();
    }
    //** Los siguientes metodos crearan las bases de la venta en odoo */
    /**
     * Creo la venta en odoo como presupuesto vacio correspondiente al cliente anterior.
     */
    SalePage.prototype.createSale = function () {
        var _this = this;
        this.utils.presentLoading("Creando Venta");
        //Para crear una venta solo necesitamos tener el id del usuario. Posteriormente crearemos los productos en su interior.
        this.odooRpc.createRecord('sale.order', {
            partner_id: this.partner_id
        }).then(function (res) {
            _this.order_id = JSON.parse(res._body)["result"];
            _this.utils.dismissLoading();
            console.log("Venta:" + JSON.parse(res._body));
            _this.getAttributesOrder(); //Metodo auxiliar para obtener atributos
        }).catch(function (err) {
            _this.utils.dismissLoading();
            alert(err);
        });
    };
    /**
     * Metodo auxiliar para obtener atributos de venta
     */
    SalePage.prototype.getAttributesOrder = function () {
        var _this = this;
        this.utils.presentLoading("Recogiendo datos");
        var patrn = [
            ["id", "=", this.order_id]
        ];
        this.odooRpc.getRecord('sale.order', patrn, [], 0, 0, "").then(function (res) {
            console.log(JSON.parse(res._body));
            _this.order_name = JSON.parse(res._body)["result"].records[0].name;
            _this.order_date = JSON.parse(res._body)["result"].records[0].date_order;
            _this.createAccountInvoice();
            _this.utils.dismissLoading();
        }).catch(function (err) {
            _this.utils.dismissLoading();
            alert(err);
        });
    };
    /**
     * Creamos una Factura que se vinculará a la venta
     */
    SalePage.prototype.createAccountInvoice = function () {
        var _this = this;
        //Para crear una venta solo necesitamos tener el id del usuario, el documento de origen y la fecha de la venta. Posteriormente crearemos los productos en su interior.
        this.odooRpc.createRecord('account.invoice', {
            partner_id: this.partner_id,
            origin: this.order_name,
            date_invoice: this.order_date
        }).then(function (res) {
            _this.invoice_id = JSON.parse(res._body)["result"];
            _this.utils.dismissLoading();
        }).catch(function (err) {
            _this.utils.dismissLoading();
            alert(err);
        });
    };
    //** Habiendo finalizado los metodos anteriores y con los datos pilares asignados, procedemos a la creación de métodos que asignarán valores a los objetos creados. */
    /**
     *  Este metodo se encarga de buscar un producto con
     *  la referancia pasada por parametro y aadirlo a una venta
     */
    SalePage.prototype.addProdToSale = function () {
        var _this = this;
        this.utils.presentLoading("Cargando..." + "\n" + "Por Favor, Espere.");
        var patrn = [
            ["barcode", "=", this.Prod_ref]
        ];
        this.odooRpc.getRecord('product.template', patrn, [], 0, 0, "").then(function (res) {
            _this.utils.dismissLoading();
            _this.product_id = Number(JSON.parse(res._body)["result"].records[0].id);
            _this.product_name = String(JSON.parse(res._body)["result"].records[0].name);
            _this.product_price = Number(JSON.parse(res._body)["result"].records[0].list_price);
            _this.prodsArray[_this.count] = { name: _this.product_name, price: _this.product_price };
            _this.total = _this.total + _this.product_price;
            _this.createSaleOrderLine();
        }).catch(function (err) {
            _this.utils.dismissLoading();
            _this.utils.presentToast("El producto no existe", 2500, true, "top");
        });
        this.count++;
    };
    /**
     * Este método crea una linea que contiene los prodcutos y se asignan a la venta anterior junto a la cantidad del mismo
     */
    SalePage.prototype.createSaleOrderLine = function () {
        var _this = this;
        this.odooRpc.createRecord('sale.order.line', {
            order_id: this.order_id,
            product_id: this.product_id,
            product_uom_qty: this.Quantity
        }).then(function (res) {
            _this.createInvoiceLine();
            _this.utils.dismissLoading();
        }).catch(function (err) {
            alert(err);
        });
    };
    /**
     * Este método crea una linea que contiene los prodcutos y se asignan a la venta anterior junto a la cantidad del mismo
     */
    SalePage.prototype.createInvoiceLine = function () {
        var _this = this;
        this.odooRpc.createRecord('account.invoice.line', {
            name: this.product_name,
            invoice_id: this.invoice_id,
            product_id: this.product_id,
            quantity: this.Quantity,
            partner_id: this.partner_id,
            account_id: 480,
            price_unit: this.product_price
        }).then(function (res) {
            console.log(JSON.stringify(res));
            _this.utils.dismissLoading();
        }).catch(function (err) {
            alert(err);
        });
        this.Prod_ref = null;
        this.Quantity = 1;
    };
    /**
     * Este método finaliza la venta y la cambia de estado junto a la factura y resetea los valores a sus valores por defecto preaparados para realizar la siguiente venta
     */
    SalePage.prototype.endSale = function () {
        this.odooRpc.saleConfirm(this.order_id);
        this.odooRpc.createInvoiceForSale(this.invoice_id);
        this.order_id = null;
        // this.Swtch = true;
        this.Prod_ref = null;
        this.Quantity = 1;
        this.utils.presentToast("Venta Realizada con exito", 3000, true, "top");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__clients_clients__["a" /* ClientsPage */]);
    };
    /**
     * El método cancela toda operación realizada hasta el momento borrandolas
     */
    SalePage.prototype.cancelSale = function () {
        this.odooRpc.deleteRecord('sale.order', this.order_id);
        this.order_id = null;
        // this.Swtch = true;
        this.Prod_ref = null;
        this.Quantity = 1;
        this.utils.presentToast("Venta Cancelada", 3000, true, "top");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__clients_clients__["a" /* ClientsPage */]);
    };
    return SalePage;
}());
SalePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sale',template:/*ion-inline-start:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\sale\sale.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Realizar Venta\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <!-- <div [hidden]="Swtch"> -->\n\n  <div>\n\n    <form (ngSubmit)="addProdToSale()">\n\n      <ion-col align-self: center>\n\n        <ion-input type="text" placeholder="Ref.Producto" name="Prod_ref" [(ngModel)]="Prod_ref"></ion-input>\n\n        <ion-input type="number" placeholder="Cantidad" name="Quantity" [(ngModel)]="Quantity"></ion-input>\n\n        <button ion-button block round outline type="submit">Añadir Producto</button>\n\n      </ion-col>\n\n    </form>\n\n    <ion-label name="total">Precio Total:</ion-label>\n\n    <ion-input type="number" name="total" [readonly]=true></ion-label>\n\n      <ion-list no-lines [virtualScroll]="prodsArray">\n\n        <ion-item-sliding *virtualItem="let prodsArray">\n\n          <ion-item>\n\n            <h2>{{prodsArray.name}}</h2>\n\n            <h3>{{prodsArray.price}}</h3>\n\n          </ion-item>\n\n        </ion-item-sliding>\n\n      </ion-list>\n\n    <ion-row>\n\n      <ion-col col-6>\n\n        <button ion-button block round outline (click)="cancelSale()">Cancelar</button>\n\n      </ion-col>\n\n      <ion-col col-6>\n\n        <button ion-button block round outline (click)="endSale()">Finalizar</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\sale\sale.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__services_odoojsonrpc__["a" /* OdooJsonRpc */], __WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], SalePage);

//# sourceMappingURL=sale.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesInvoiceViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_odoojsonrpc__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_utils__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SalesInvoiceViewPage = (function () {
    function SalesInvoiceViewPage(navCtrl, navParams, odooRpc, utils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.odooRpc = odooRpc;
        this.utils = utils;
        this.data = [];
        this.invoice_id = navParams.get("id");
        this.display();
    }
    SalesInvoiceViewPage.prototype.ionViewDidLoad = function () {
    };
    SalesInvoiceViewPage.prototype.ef = function () {
        this.e = true;
        this.Swtch_1 = true;
    };
    SalesInvoiceViewPage.prototype.tar = function () {
        this.t = true;
        this.Swtch_1 = true;
    };
    SalesInvoiceViewPage.prototype.display = function () {
        var _this = this;
        this.odooRpc.getRecord("account.invoice", [["id", "=", this.invoice_id]], [], 0, 0, "").then(function (res) {
            _this.checkState(_this.state = JSON.parse(res._body)["result"].records[0].state);
        });
        this.utils.presentLoading("Cargando...");
        this.odooRpc
            .getRecord("account.invoice", [
            ["id", "=", this.invoice_id]
        ], [
            "origin",
            "state",
            "date_invoice",
            "date_due",
            "partner_id"
        ], 0, 0, "")
            .then(function (res) {
            _this.utils.dismissLoading();
            var data = JSON.parse(res._body)["result"].records;
            for (var record in data) {
                _this.origin = data[record].origin == false ? "N/A" : data[record].origin;
                _this.state = data[record].state == false ? "N/A" : data[record].state;
                _this.date_invoice = data[record].date_invoice == false ? "N/A" : data[record].date_invoice;
                _this.date_due = data[record].date_due == false ? "N/A" : data[record].date_due;
                _this.partner_id = data[record].partner_id == false ? "N/A" : data[record].partner_id;
                _this.data.push({
                    id: data[record].id,
                    origin: data[record].origin,
                    state: data[record].state == false ? "N/A" : data[record].state,
                    date_invoice: data[record].date_invoice == false ? "N/A" : data[record].date_invoice,
                    date_due: data[record].date_due == false ? "N/A" : data[record].date_due,
                    partner_id: data[record].partner_id == false ? "N/A" : data[record].partner_id
                });
            }
        });
    };
    SalesInvoiceViewPage.prototype.checkState = function (state) {
        console.log(state === "paid");
        if (state === "paid") {
            this.Swtch = true;
            this.Swtch_1 = true;
        }
        else {
            this.Swtch = false;
            this.Swtch_1 = false;
        }
    };
    SalesInvoiceViewPage.prototype.statusPayed = function () {
        console.log("Id de ventas" + this.invoice_id);
        console.log(this.e);
        console.log(this.t);
        if (this.e) {
            this.odooRpc.validateAndPay(this.invoice_id, 7);
        }
        else if (this.t) {
            this.odooRpc.validateAndPay(this.invoice_id, 8);
        }
        else {
            console.log("No esta seleccionada ninguna opcion");
        }
        this.Swtch = true;
    };
    return SalesInvoiceViewPage;
}());
SalesInvoiceViewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sale-invoice-view',template:/*ion-inline-start:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\sales-invoice-view\sales-invoice-view.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Detalles de Factura\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div class="main-cnt">\n\n    <ion-list>\n\n      <div *ngFor="let item of data">\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Documento de Origen:</ion-col>\n\n              <ion-col>{{item.origin}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Estado:</ion-col>\n\n              <ion-col>{{item.state}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Fecha de la Factura:</ion-col>\n\n              <ion-col>{{item.date_invoice}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Fecha de Vencimiento:</ion-col>\n\n              <ion-col>{{item.date_due}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Id de Cliente:</ion-col>\n\n              <ion-col>{{item.partner_id}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n\n\n\n\n      <div [hidden]="Swtch">\n\n        <div [hidden]="Swtch_1">\n\n          <ion-card>\n\n            <ion-card-content>\n\n              <ion-row><button ion-button block round outline (click)="ef()">Efectivo</button></ion-row>\n\n              <ion-row><button ion-button block round outline (click)="tar()">Tarjeta</button></ion-row>\n\n            </ion-card-content>\n\n          </ion-card>\n\n        </div>\n\n        <button ion-button block round outline (click)="statusPayed()">Finalizar</button>\n\n      </div>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\sales-invoice-view\sales-invoice-view.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_odoojsonrpc__["a" /* OdooJsonRpc */], __WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */]])
], SalesInvoiceViewPage);

//# sourceMappingURL=sales-invoice-view.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesInvoicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_utils__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sales_invoice_view_sales_invoice_view__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_odoojsonrpc__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SalesInvoicePage = (function () {
    function SalesInvoicePage(navCtrl, menu, navParams, odooRpc, network, utils) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.navParams = navParams;
        this.odooRpc = odooRpc;
        this.network = network;
        this.utils = utils;
        this.accountArray = [];
        this.menu.swipeEnable(true);
        this.display();
    }
    /** Estos métodos guardan en el array a mostrar los elementos de la tabla de Facturas */
    /**
     * Aqui se muestran las respuestas del servidor dentro de la tabla Facturas y llama al método para rellenar array
     */
    SalesInvoicePage.prototype.display = function () {
        var _this = this;
        this.utils.presentLoading("Cargando ...");
        this.odooRpc
            .getRecord('account.invoice', [], [], 0, 0, "")
            .then(function (res) {
            _this.utils.dismissLoading();
            _this.fillParners(res);
        });
    };
    /**
     * El método rellena el array
     */
    SalesInvoicePage.prototype.fillParners = function (res) {
        var json = JSON.parse(res._body);
        if (!json.error) {
            var data = json["result"].records;
            for (var i in data) {
                this.accountArray.push({
                    id: data[i].id,
                    number: data[i].number == false ? "N/A" : data[i].number,
                });
            }
        }
    };
    /**
     * Método que te abre cada instancia de Facturas
    */
    SalesInvoicePage.prototype.view = function (idx) {
        var params = {
            id: this.accountArray[idx].id
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__sales_invoice_view_sales_invoice_view__["a" /* SalesInvoiceViewPage */], params);
    };
    return SalesInvoicePage;
}());
SalesInvoicePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sales-invoice',template:/*ion-inline-start:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\sales-invoice\sales-invoice.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Facturas\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-list no-lines [virtualScroll]="accountArray">\n\n    <ion-item-sliding *virtualItem="let accountArray; let i=index">\n\n      <ion-item (click)="view(i)">\n\n        <h2>{{accountArray.number}}</h2>\n\n      </ion-item>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\sales-invoice\sales-invoice.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__services_odoojsonrpc__["a" /* OdooJsonRpc */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_2__services_utils__["a" /* Utils */]])
], SalesInvoicePage);

//# sourceMappingURL=sales-invoice.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransfersViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_odoojsonrpc__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_utils__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TransfersViewPage = TransfersViewPage_1 = (function () {
    function TransfersViewPage(viewCtrl, menu, navCtrl, navParams, odooRpc, utils) {
        this.viewCtrl = viewCtrl;
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.odooRpc = odooRpc;
        this.utils = utils;
        this.Swtch = true;
        this.data = [];
        this.menu.swipeEnable(true);
        this.transf_id = this.navParams.get("id");
    }
    TransfersViewPage.prototype.checkState = function (state) {
        console.log(state === "done");
        if (state === "done") {
            this.Swtch = true;
        }
        else {
            this.Swtch = false;
        }
    };
    TransfersViewPage.prototype.display = function () {
        var _this = this;
        this.odooRpc.getRecord("stock.move", [["id", "=", this.transf_id]], [], 0, 0, "").then(function (res) {
            _this.checkState(_this.state = JSON.parse(res._body)["result"].records[0].state);
        });
        this.utils.presentLoading("Cargando...");
        var fields = [
            "origin",
            "reference",
            "name",
            "ordered_qty",
            "partner_id",
            "picking_type_id",
            "state"
        ];
        this.odooRpc
            .getRecord("stock.move", [["id", "=", this.transf_id]], fields, 0, 0, "")
            .then(function (res) {
            _this.utils.dismissLoading();
            var data = JSON.parse(res._body)["result"].records;
            for (var record in data) {
                _this.origin = data[record].origin == false ? "N/A" : data[record].origin;
                _this.reference = data[record].reference == false ? "N/A" : data[record].reference;
                _this.name = data[record].name == false ? "N/A" : data[record].name;
                _this.ordered_qty = data[record].ordered_qty == false ? "N/A" : data[record].ordered_qty;
                _this.partner_id = data[record].partner_id == false ? "N/A" : data[record].partner_id;
                _this.picking_type_id = data[record].picking_type_id == false ? "N/A" : data[record].picking_type_id;
                _this.state = data[record].state == false ? "N/A" : data[record].state;
                _this.data.push({
                    id: data[record].id,
                    origin: data[record].origin,
                    reference: data[record].reference == false ? "N/A" : data[record].reference,
                    name: data[record].name == false ? "N/A" : data[record].name,
                    ordered_qty: data[record].ordered_qty == false ? "N/A" : data[record].ordered_qty,
                    partner_id: data[record].partner_id == false ? "N/A" : data[record].partner_id,
                    picking_type_id: data[record].picking_type_id == false ? "N/A" : data[record].picking_type_id,
                    state: data[record].state == false ? "N/A" : data[record].state
                });
            }
        });
    };
    TransfersViewPage.prototype.updateQty = function () {
        if (this.qty_done == null || this.qty_done > this.ordered_qty) {
            this.utils.presentAlert("Error", "Cantidad a entregar no puede ser nula o superior a la cantidad pedida", [{
                    text: "Ok"
                }]);
        }
        else {
            this.odooRpc.updateRecord('stock.move', this.transf_id, { quantity_done: this.qty_done });
        }
    };
    TransfersViewPage.prototype.statusChange = function () {
        var _this = this;
        this.odooRpc.getRecord('stock.move', [["id", "=", this.transf_id]], [], 0, 0, "").then(function (res) {
            console.log(JSON.parse(res._body));
            var pickingID = JSON.parse(res._body)['result'].records[0].picking_id[0];
            console.log("Picking ID: " + pickingID);
            _this.odooRpc.call('stock.picking', 'button_validate', [pickingID], {}).then(function (res) {
                console.log(JSON.parse(res._body));
            });
        }).catch(function (err) { alert(err); });
        this.data.pop();
        this.navCtrl.push(TransfersViewPage_1);
    };
    return TransfersViewPage;
}());
TransfersViewPage = TransfersViewPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-transfers-view',template:/*ion-inline-start:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\transfers-view\transfers-view.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Detalles de Transferencia\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <!-- <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content>\n\n\n\n    </ion-refresher-content>\n\n  </ion-refresher> -->\n\n  <div class="main-cnt">\n\n    <ion-list>\n\n      <div *ngFor="let item of data">\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Documento de Origen:</ion-col>\n\n              <ion-col>{{item.origin}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Producto:</ion-col>\n\n              <ion-col>{{item.name}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Cantidad:</ion-col>\n\n              <ion-col>{{item.ordered_qty}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Id de Cliente:</ion-col>\n\n              <ion-col>{{item.partner_id}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Tipo transferencia:</ion-col>\n\n              <ion-col>{{item.picking_type_id}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <ion-row>\n\n              <ion-col class="spec">Estado de transferencia:</ion-col>\n\n              <ion-col>{{item.state}}</ion-col>\n\n            </ion-row>\n\n          </ion-card-content>\n\n        </ion-card>\n\n        <div [hidden]="Swtch">\n\n          <form (ngSubmit)="updateQty()">\n\n            <ion-card>\n\n              <ion-card-content>\n\n                <ion-row>\n\n                  <ion-col class="spec">Cantidad a entregar:</ion-col>\n\n                  <ion-col>\n\n                    <ion-input type="number" name="qty_done" placeholder="Introduce un numero" [(ngModel)]="qty_done"></ion-input>\n\n                  </ion-col>\n\n                </ion-row>\n\n              </ion-card-content>\n\n            </ion-card>\n\n            <button ion-button block round outline type="submit">\n\n              Actualizar Cantidades\n\n            </button>\n\n          </form>\n\n          <button ion-button block round outline (click)="statusChange()">\n\n            Finalizar\n\n          </button>\n\n        </div>\n\n      </div>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\transfers-view\transfers-view.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_odoojsonrpc__["a" /* OdooJsonRpc */], __WEBPACK_IMPORTED_MODULE_3__services_utils__["a" /* Utils */]])
], TransfersViewPage);

var TransfersViewPage_1;
//# sourceMappingURL=transfers-view.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransfersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_utils__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transfers_view_transfers_view__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_odoojsonrpc__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TransfersPage = (function () {
    function TransfersPage(navCtrl, menu, navParams, odooRpc, network, utils) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.navParams = navParams;
        this.odooRpc = odooRpc;
        this.network = network;
        this.utils = utils;
        this.transfArray = [];
        this.menu.swipeEnable(true);
        this.display();
    }
    /** Estos métodos guardan en el array a mostrar los elementos de la tabla de Transferencias */
    /**
     * Aqui se muestran las respuestas del servidor dentro de la tabla Transferencias y llama al método para rellenar array
     */
    TransfersPage.prototype.display = function () {
        var _this = this;
        this.utils.presentLoading("Cargando ...");
        this.odooRpc
            .getRecord("stock.move", [
            ["picking_type_id", "!=", null]
        ], [], 0, 0, "")
            .then(function (transf) {
            _this.utils.dismissLoading();
            _this.fillParners(transf);
        });
    };
    TransfersPage.prototype.fillParners = function (transf) {
        var json = JSON.parse(transf._body);
        if (!json.error) {
            var data = json["result"].records;
            for (var i in data) {
                this.transfArray.push({
                    id: data[i].id,
                    reference: data[i].reference == false ? "N/A" : data[i].reference,
                    origin: data[i].origin == false ? "N/A" : data[i].origin,
                    picking_type_id: data[i].picking_type_id == false ? "N/A" : data[i].picking_type_id
                });
            }
        }
    };
    TransfersPage.prototype.view = function (idx) {
        var params = {
            id: this.transfArray[idx].id
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__transfers_view_transfers_view__["a" /* TransfersViewPage */], params);
    };
    return TransfersPage;
}());
TransfersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-transfers',template:/*ion-inline-start:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\transfers\transfers.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Transferencias\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-list no-lines [virtualScroll]="transfArray">\n\n    <ion-item-sliding *virtualItem="let transfArray; let i=index">\n\n      <ion-item (click)="view(i)">\n\n        <h2>{{transfArray.reference}}</h2>\n\n        <p>{{transfArray.origin}}</p>\n\n      </ion-item>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\transfers\transfers.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__services_odoojsonrpc__["a" /* OdooJsonRpc */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_2__services_utils__["a" /* Utils */]])
], TransfersPage);

//# sourceMappingURL=transfers.js.map

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/advanced-tools-login/advanced-tools-login.module": [
		578,
		0
	],
	"../pages/clients/clients.module": [
		579,
		6
	],
	"../pages/sale/sale.module": [
		582,
		5
	],
	"../pages/sales-invoice-view/sales-invoice-view.module": [
		580,
		4
	],
	"../pages/sales-invoice/sales-invoice.module": [
		581,
		3
	],
	"../pages/transfers-view/transfers-view.module": [
		583,
		2
	],
	"../pages/transfers/transfers.module": [
		584,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 193;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(267);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_clients_clients__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_sale_sale__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sales_invoice_sales_invoice__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_odoojsonrpc__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_sales_invoice_view_sales_invoice_view__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_transfers_transfers__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_transfers_view_transfers_view__ = __webpack_require__(137);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_sale_sale__["a" /* SalePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_sales_invoice_sales_invoice__["a" /* SalesInvoicePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_sales_invoice_view_sales_invoice_view__["a" /* SalesInvoiceViewPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_clients_clients__["a" /* ClientsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_transfers_transfers__["a" /* TransfersPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_transfers_view_transfers_view__["a" /* TransfersViewPage */]
        ],
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/advanced-tools-login/advanced-tools-login.module#AdvancedToolsLoginPageModule', name: 'AdvancedToolsLoginPage', segment: 'advanced-tools-login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/clients/clients.module#ClientsPageModule', name: 'ClientsPage', segment: 'clients', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/sales-invoice-view/sales-invoice-view.module#SalesInvoiceViewPageModule', name: 'SalesInvoiceViewPage', segment: 'sales-invoice-view', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/sales-invoice/sales-invoice.module#SalesInvoicePageModule', name: 'SalesInvoicePage', segment: 'sales-invoice', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/sale/sale.module#SalePageModule', name: 'SalePage', segment: 'sale', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/transfers-view/transfers-view.module#TransfersViewPageModule', name: 'TransfersViewPage', segment: 'transfers-view', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/transfers/transfers.module#TransfersPageModule', name: 'TransfersPage', segment: 'transfers', priority: 'low', defaultHistory: [] }
                ]
            })],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_sale_sale__["a" /* SalePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_sales_invoice_sales_invoice__["a" /* SalesInvoicePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_sales_invoice_view_sales_invoice_view__["a" /* SalesInvoiceViewPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_transfers_transfers__["a" /* TransfersPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_transfers_view_transfers_view__["a" /* TransfersViewPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_clients_clients__["a" /* ClientsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_10__services_odoojsonrpc__["a" /* OdooJsonRpc */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OdooJsonRpc; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OdooJsonRpc = (function () {
    function OdooJsonRpc(http, utils) {
        this.http = http;
        this.utils = utils;
        this.jsonRpcID = 0;
        this.list = "/web/database/list";
        this.get_list = "/web/database/get_list";
        this.jsonrpc = "/jsonrpc";
        this.http = http;
    }
    /**--------------------Métodos de Odoo--------------------- */
    OdooJsonRpc.prototype.init = function (configs) {
        this.odoo_server = configs.odoo_server;
        console.log(this.odoo_server);
        this.http_auth = configs.http_auth || null;
    };
    OdooJsonRpc.prototype.setOdooServer = function (odoo_server) {
        this.odoo_server = odoo_server;
    };
    OdooJsonRpc.prototype.setHttpAuth = function (http_auth) {
        this.http_auth = http_auth;
    };
    /**
     * @param response Error
     */
    OdooJsonRpc.prototype.handleOdooErrors = function (response) {
        var err = response.error.data.message;
        var msg = err.split("\n");
        var errMsg = msg[0];
        this.utils.presentAlert("Error", errMsg, [{
                text: "Ok",
                role: "cancel"
            }]);
    };
    OdooJsonRpc.prototype.handleHttpErrors = function (error) {
        return Promise.reject(error.message || error);
    };
    /**
     * Calls the method of that particular model
     * @param model Nombre del modelo
     * @param method Method name of particular model
     * @param args Array of fields
     * @param kwargs Object
     */
    OdooJsonRpc.prototype.call = function (model, method, args, kwargs) {
        kwargs = kwargs || {};
        var params = {
            model: model,
            method: method,
            args: args,
            kwargs: kwargs == false ? {} : kwargs,
            context: this.getContext()
        };
        return this.sendRequest("/web/dataset/call_kw", params);
    };
    /**
     * Envia una request de JSON a odoo server
     * @param url Url de odoo
     * @param params Objeto
     */
    OdooJsonRpc.prototype.sendRequest = function (url, params) {
        var options = this.buildRequest(params);
        var token = localStorage.getItem("token");
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
            'access-control-allow-methods': 'POST,OPTIONS',
            'access-control-allow-headers': 'Content-Type, access-control-allow-origin, accept',
        });
        var result = this.http.post(this.odoo_server + url, options, { headers: this.headers })
            .toPromise();
        return result;
    };
    /**
     * Construye una request a Odoo
     * @param url Url Odoo
     * @param params Objeto
     */
    OdooJsonRpc.prototype.buildRequest = function (params) {
        this.jsonRpcID += 1;
        return JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            id: this.jsonRpcID,
            params: params,
        });
    };
    /**
     * Devuelve todos los moulos
     */
    OdooJsonRpc.prototype.modules = function () {
        var params = {
            context: {}
        };
        return this.sendRequest("/web/session/modules", params);
    };
    /**
     * Login a la database
     * @param db Base de datos
     * @param login Usuario
     * @param password contraseña
     */
    OdooJsonRpc.prototype.login = function (db, login, password) {
        var params = {
            db: db,
            login: login,
            password: password,
            base_location: this.odoo_server,
            context: {}
        };
        return this.sendRequest("/web/session/authenticate", params);
    };
    /**---------------------CRUD de Instancias en modelos------------------------- */
    /**
     * Crea una nueva entrada
     * @param model Nombre del modelo
     * @param mArgs Campos y sus valores
     */
    OdooJsonRpc.prototype.createRecord = function (model, mArgs) {
        var args = [mArgs];
        return this.call(model, "create", args, null);
    };
    /**
    * Obtiene una entrada que cumple con las condiciones
    * @param model Nombre del modelo
    * @param domain Condiciones
    *              (e.g) let domain = [
    *                         ["id","=",11]
    *                    ]
    * @param fields Campos a obtener
    *              (e.g) let fields = [
    *                         ["id","name","email"]
    *                    ]
    * @param limit limite
    * @param offset
    * @param sort
    */
    OdooJsonRpc.prototype.getRecord = function (model, domain, fields, limit, offset, sort) {
        var params = {
            model: model,
            fields: fields,
            domain: domain,
            offset: offset,
            limit: limit,
            sort: sort,
            context: this.getContext()
        };
        return this.sendRequest("/web/dataset/search_read", params);
    };
    /**
     * Borra una entrada con id:x
     * @param model Nombre del modelo
     * @param id Id del elemento a borrar
     */
    OdooJsonRpc.prototype.deleteRecord = function (model, id) {
        var mArgs = [id];
        return this.call(model, "unlink", mArgs, null);
    };
    /**
     * Actualiza una entrada con Id:x
     * @param model Nombre del modelo
     * @param id Id del elemento a actualizar
     * @param mArgs Campos a actualizar
     *              (e.g)
     *              let args = {
     *                 "name": "Vlp"
     *              }
     */
    OdooJsonRpc.prototype.updateRecord = function (model, id, mArgs) {
        var args = [
            [id], mArgs
        ];
        return this.call(model, "write", args, null);
    };
    /**------------Fin del CRUD------------------- */
    /**----------------Metodos para el proyecto de Gestión de Ventas------------ */
    /**
     * Confirma una venta y crea una transferencia del producto en el inventario
     *
     * @param order_id //Id de Venta
     */
    OdooJsonRpc.prototype.saleConfirm = function (order_id) {
        this.call('sale.order', "action_confirm", [order_id], {}).then(function (res) {
            console.log(JSON.parse(res._body));
        });
        this.call('sale.advance.payment.inv', "create_invoices", [], {}).then(function (res) {
            console.log(JSON.parse(res._body));
        });
    };
    /**
     * Creamos factura para la venta con id pasado por parametro
     * @param invoice_id //Id de Factura
     */
    OdooJsonRpc.prototype.createInvoiceForSale = function (invoice_id) {
        this.call('account.invoice', "action_invoice_open", [invoice_id], {});
        //   this.call('account.payment', "action_invoice_open", [invoice_id], {}).then((res: any) => {
        //     console.log(JSON.parse(res._body))
        //   });
    };
    OdooJsonRpc.prototype.validateAndPay = function (invoice_id, int) {
        this.call('account.invoice', "pay_and_reconcile", [invoice_id, int], {});
    };
    /** --------------------Otros metodos utiles ------------------*/
    /**
     * @param model Nombre del modelo
     * @param id Id del dato que quieres cargar
     */
    OdooJsonRpc.prototype.load = function (model, id) {
        var params = {
            model: model,
            id: id,
            fields: [],
            context: this.getContext()
        };
        return this.sendRequest("/web/dataset/load", params);
    };
    OdooJsonRpc.prototype.check = function () {
        var params = {
            context: this.getContext()
        };
        return this.sendRequest("/web/session/check", params);
    };
    /**
     * Destruye la sesion
     */
    OdooJsonRpc.prototype.destroy = function () {
        var params = {
            context: {}
        };
        return this.sendRequest("/web/session/destroy", params);
    };
    /**
     * Reads that perticular fields of that particular ID
     * @param model Nombre del modelo
     * @param id Id del objeto a leer
     * @param mArgs Array de los
     */
    OdooJsonRpc.prototype.read = function (model, id, mArgs) {
        var args = [
            id, mArgs
        ];
        return this.call(model, 'read', args);
    };
    /**
     * Obriene el contexto
     */
    OdooJsonRpc.prototype.getContext = function () {
        var response = localStorage.getItem("token");
        var jsonData = JSON.parse(response);
        var context = jsonData["user_context"];
        return context;
    };
    return OdooJsonRpc;
}());
OdooJsonRpc = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* Utils */]])
], OdooJsonRpc);

//# sourceMappingURL=odoojsonrpc.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Utils = (function () {
    function Utils(alrtCtrl, loadingCtrl, toastCtrl, actionSheetCtrl) {
        this.alrtCtrl = alrtCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
    }
    Utils.prototype.presentAlert = function (title, message, buttons, subtitle, enableBackdropDismiss, inputs) {
        var alrt = this.alrtCtrl.create({
            title: title,
            subTitle: subtitle,
            message: message,
            buttons: buttons,
            enableBackdropDismiss: enableBackdropDismiss,
            inputs: inputs
        });
        alrt.present();
    };
    Utils.prototype.presentToast = function (message, duration, dissmissOnPageChange, position, showCloseButton, closeButtonText) {
        var toast = this.toastCtrl.create({
            message: message,
            position: position,
            dismissOnPageChange: dissmissOnPageChange,
            duration: duration,
            showCloseButton: showCloseButton,
            closeButtonText: closeButtonText
        });
        toast.present();
    };
    Utils.prototype.presentLoading = function (content, duration, dissmissOnPageChange, enableBackDropDismiss, showBackDrop, spinner) {
        this.loading = this.loadingCtrl.create({
            content: content,
            dismissOnPageChange: dissmissOnPageChange,
            duration: duration,
            enableBackdropDismiss: enableBackDropDismiss,
            showBackdrop: showBackDrop,
            spinner: spinner
        });
        this.loading.present();
    };
    Utils.prototype.dismissLoading = function () {
        this.loading.dismiss();
    };
    Utils.prototype.presentActionSheet = function (buttons, title, subtitle, enableBackdropDismiss) {
        var actionCtrl = this.actionSheetCtrl.create({
            buttons: buttons,
            subTitle: subtitle,
            title: title,
            enableBackdropDismiss: enableBackdropDismiss
        });
        actionCtrl.present();
    };
    return Utils;
}());
Utils = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], Utils);

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_login_login__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_odoojsonrpc__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_utils__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_clients_clients__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_sales_invoice_sales_invoice__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_transfers_transfers__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, odooRpc, alert, network) {
        var _this = this;
        this.statusBar = statusBar;
        this.odooRpc = odooRpc;
        this.alert = alert;
        this.network = network;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            splashScreen.hide();
            // let status bar overlay webview
            _this.statusBar.overlaysWebView(false);
            // set status bar to color
            _this.statusBar.backgroundColorByHexString("#3b73f7");
        });
        if (localStorage.getItem("token")) {
            var response = localStorage.getItem("token");
            var jsonData = JSON.parse(response);
            var username = jsonData["username"];
            var pass = jsonData["password"];
            var url_1 = jsonData["web.base.url"];
            var db = jsonData["db"];
            this.odooRpc.init({
                odoo_server: url_1,
                http_auth: "username:password"
            });
            this.odooRpc.login(db, username, pass).catch(function (error) {
                var alrt = _this.alert.create({
                    title: "Estado del Servidor",
                    message: "La conexión a " + url_1 + " se ha cancelado",
                    buttons: ["Ok"]
                });
                alrt.present();
            });
            this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_clients_clients__["a" /* ClientsPage */];
        }
        this.pages = [{
                title: 'Página De Clientes',
                component: __WEBPACK_IMPORTED_MODULE_8__pages_clients_clients__["a" /* ClientsPage */]
            }, {
                title: 'Facturas',
                component: __WEBPACK_IMPORTED_MODULE_9__pages_sales_invoice_sales_invoice__["a" /* SalesInvoicePage */]
            }, {
                title: 'Transferencias',
                component: __WEBPACK_IMPORTED_MODULE_10__pages_transfers_transfers__["a" /* TransfersPage */]
            }];
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    /**
     * Metodo que permite cerrar la sesión actual
     */
    MyApp.prototype.logOut = function () {
        localStorage.removeItem("token");
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_0__pages_login_login__["a" /* LoginPage */]);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-header>\n\n      <ion-toolbar>\n\n        <ion-title>Menu</ion-title>\n\n      </ion-toolbar>\n\n    </ion-header>\n\n  \n\n    <ion-content>\n\n      <ion-list>\n\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n          {{p.title}}\n\n        </button>\n\n      </ion-list>\n\n      <ion-buttons end>\n\n          <button ion-button icon-only (click)="logOut()">\n\n            Cerrar Sesión\n\n            <ion-icon name="log-out"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    </ion-content>\n\n  \n\n  </ion-menu>\n\n  \n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n  '/*ion-inline-end:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\app\app.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_odoojsonrpc__["a" /* OdooJsonRpc */], __WEBPACK_IMPORTED_MODULE_7__services_utils__["a" /* Utils */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1__services_odoojsonrpc__["a" /* OdooJsonRpc */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_utils__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_odoojsonrpc__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sale_sale__ = __webpack_require__(134);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ClientsPage = (function () {
    function ClientsPage(navCtrl, navParams, odooRpc, network, utils, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.odooRpc = odooRpc;
        this.network = network;
        this.utils = utils;
        this.menu = menu;
        this.clients = [];
        this.menu.swipeEnable(true);
        this.display();
    }
    /**
     * El método siguiente prueba si existe el usuario y crea la venta.
     */
    ClientsPage.prototype.checkUser = function () {
        var _this = this;
        if (this.Nif.length == 9 && this.checkNif(this.Nif)) {
            this.utils.presentLoading("Cargando..." + "\n" + "Por Favor, Espere.");
            var patrn = [
                ["vat", "=", this.Nif]
            ];
            this.odooRpc.getRecord('res.partner', patrn, [], 0, 0, "").then(function (res) {
                _this.partner_id = JSON.parse(res._body)["result"].records[0].id;
                _this.utils.dismissLoading();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sale_sale__["a" /* SalePage */], {
                    id: _this.partner_id
                });
            }).catch(function (err) {
                _this.utils.dismissLoading();
                _this.utils.presentAlert("El Usuario no existe, ¿Desea crearlo?", "Introduzca el nombre y dele a crear o pulse fuera del recuadro para cancelar", [{
                        text: "Crear Cliente",
                        handler: function (create) {
                            _this.odooRpc.createRecord('res.partner', {
                                vat: _this.Nif,
                                name: create.Name,
                                customer: true
                            }).then(function (res) {
                                console.log(JSON.parse(res._body));
                                _this.partner_id = JSON.parse(res._body)["result"];
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sale_sale__["a" /* SalePage */], {
                                    id: _this.partner_id
                                });
                            });
                        }
                    }], "", true, [{
                        name: 'Name',
                        placeholder: 'Nombre',
                        type: "text",
                        required: true
                    }]);
            });
        }
        else {
            this.utils.presentToast("El NIF introducido no es correcto", 2000, true, "top");
        }
    };
    /** Estos métodos guardan en el array a mostrar los elementos de la tabla de Clientes */
    /**
     * Aqui se muestran las respuestas del servidor dentro de la tabla Clientes y llama al método para rellenar array
     */
    ClientsPage.prototype.display = function () {
        var _this = this;
        this.utils.presentLoading("Cargando ...");
        this.odooRpc
            .getRecord('res.partner', [], [], 0, 0, "")
            .then(function (res) {
            _this.utils.dismissLoading();
            _this.fillParners(res);
        });
        this.utils.dismissLoading();
    };
    /**
     * El método rellena el array
     */
    ClientsPage.prototype.fillParners = function (res) {
        var json = JSON.parse(res._body);
        if (!json.error) {
            var data = json["result"].records;
            console.log(JSON.parse(res._body));
            for (var i in data) {
                if (data[i].customer) {
                    this.clients.push({
                        id: data[i].id,
                        name: data[i].name == false ? "N/A" : data[i].name,
                        vat: data[i].vat == false ? "N/A" : data[i].vat
                    });
                }
            }
        }
    };
    /**
     * Método que te abre cada instancia de Clientes
     */
    ClientsPage.prototype.view = function (idx) {
        var params = {
            id: this.clients[idx].id
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sale_sale__["a" /* SalePage */], params);
    };
    ClientsPage.prototype.checkNif = function (dni) {
        var numero;
        var letr;
        var letra;
        var expresion_regular_dni;
        expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
        if (expresion_regular_dni.test(dni) == true) {
            numero = dni.substr(0, dni.length - 1);
            letr = dni.substr(dni.length - 1, 1);
            numero = numero % 23;
            letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letra = letra.substring(numero, numero + 1);
            if (letra != letr.toUpperCase()) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    return ClientsPage;
}());
ClientsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-clients',template:/*ion-inline-start:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\clients\clients.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Clientes\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <form (ngSubmit)="checkUser()">\n\n    <ion-item class="border-box">\n\n      <ion-input type="text" placeholder="NIF/DNI" [(ngModel)]="Nif" name="Nif" required></ion-input>\n\n    </ion-item>\n\n    <div class="spacer" style="height: 10px;"></div>\n\n    <button ion-button block round outline type="submit">\n\n      Comprobar\n\n    </button>\n\n  </form>\n\n  <ion-list no-lines [virtualScroll]="clients">\n\n    <ion-item-sliding *virtualItem="let clients; let i=index">\n\n      <ion-item (click)="view(i)">\n\n        <h2>{{clients.name}}</h2>\n\n        <p>{{clients.vat}}</p>\n\n      </ion-item>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\clients\clients.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__services_odoojsonrpc__["a" /* OdooJsonRpc */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_2__services_utils__["a" /* Utils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
], ClientsPage);

//# sourceMappingURL=clients.js.map

/***/ })

},[262]);
//# sourceMappingURL=main.js.map