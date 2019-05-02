webpackJsonp([0],{

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvancedToolsLoginPageModule", function() { return AdvancedToolsLoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__advanced_tools_login__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(133);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AdvancedToolsLoginPageModule = (function () {
    function AdvancedToolsLoginPageModule() {
    }
    return AdvancedToolsLoginPageModule;
}());
AdvancedToolsLoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__advanced_tools_login__["a" /* AdvancedToolsLoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]),
        ],
    })
], AdvancedToolsLoginPageModule);

//# sourceMappingURL=advanced-tools-login.module.js.map

/***/ }),

/***/ 585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvancedToolsLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_odoojsonrpc__ = __webpack_require__(28);
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
 * Generated class for the AdvancedToolsLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdvancedToolsLoginPage = (function () {
    function AdvancedToolsLoginPage(viewCtrl, odooRpc) {
        this.viewCtrl = viewCtrl;
        this.odooRpc = odooRpc;
        this.odooUrl = "http://172.18.8.25:8069";
    }
    AdvancedToolsLoginPage.prototype.setUp = function () {
        this.viewCtrl.dismiss();
    };
    AdvancedToolsLoginPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return AdvancedToolsLoginPage;
}());
AdvancedToolsLoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-advanced-tools-login',template:/*ion-inline-start:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\advanced-tools-login\advanced-tools-login.html"*/'<!--\n  Generated template for the AdvancedToolsLoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-input type="text" placeholder="Url Odoo" [(ngModel)]="odooUrl" name="odooUrl" required></ion-input>\n  <button ion-button block round outline (click)="setUp()">\n    Guardar configuración\n  </button>\n</ion-content>\n'/*ion-inline-end:"C:\Proyectos_Aplicaciones\Proyecto_Gestor_Ventas(OdooApi+Ionic)\src\pages\advanced-tools-login\advanced-tools-login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__services_odoojsonrpc__["a" /* OdooJsonRpc */]])
], AdvancedToolsLoginPage);

//# sourceMappingURL=advanced-tools-login.js.map

/***/ })

});
//# sourceMappingURL=0.js.map