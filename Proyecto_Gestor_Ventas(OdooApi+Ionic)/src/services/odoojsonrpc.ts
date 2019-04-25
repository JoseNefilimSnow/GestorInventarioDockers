import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { Headers, Http } from '@angular/http';
import { Utils } from './utils';
import { List } from 'ionic-angular/components/list/list';
import { Injectable } from '@angular/core';

@Injectable()
export class OdooJsonRpc {

    private jsonRpcID: number = 0;
    private headers: Headers;
    private odoo_server: string;
    private http_auth: string;
    private list = "/web/database/list";
    private get_list = "/web/database/get_list";
    private jsonrpc = "/jsonrpc";

    constructor(private http: Http, private utils: Utils) {
        this.http = http;
    }

    /**--------------------Métodos de Odoo--------------------- */
    public init(configs: any) {
        this.odoo_server = configs.odoo_server;
        console.log(this.odoo_server);
        this.http_auth = configs.http_auth || null;
    }

    public setOdooServer(odoo_server: string) {
        this.odoo_server = odoo_server;
    }


    public setHttpAuth(http_auth: string) {
        this.http_auth = http_auth;
    }

    /**
     * @param response Error
     */
    public handleOdooErrors(response: any) {
        let err: string = response.error.data.message
        let msg = err.split("\n")
        let errMsg = msg[0]

        this.utils.presentAlert("Error", errMsg, [{
            text: "Ok",
            role: "cancel"
        }])
    }

    public handleHttpErrors(error: any) {
        return Promise.reject(error.message || error);
    }


    /**
     * Calls the method of that particular model
     * @param model Nombre del modelo
     * @param method Method name of particular model
     * @param args Array of fields
     * @param kwargs Object
     */
    public call(model: string, method: string, args: any, kwargs?: any) {

        kwargs = kwargs || {};
        let params = {
            model: model,
            method: method,
            args: args,
            kwargs: kwargs == false ? {} : kwargs,
            context: this.getContext()
        };
        return this.sendRequest("/web/dataset/call_kw", params);
    }

    /**
     * Envia una request de JSON a odoo server
     * @param url Url de odoo
     * @param params Objeto
     */
    public sendRequest(url: string, params: Object): Promise<any> {
        let options = this.buildRequest(params);
        let token = localStorage.getItem("token");
        this.headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
            'access-control-allow-methods':'POST,OPTIONS',
            'access-control-allow-headers':'Content-Type, access-control-allow-origin, accept',
        });

        let result = this.http.post(this.odoo_server + url, options, { headers: this.headers })
            .toPromise()
        return result;
    }

    /**
     * Construye una request a Odoo
     * @param url Url Odoo
     * @param params Objeto
     */
    private buildRequest(params: any) {
        this.jsonRpcID += 1;
        return JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            id: this.jsonRpcID,
            params: params,
        });
    }


    /**
     * Devuelve todos los moulos
     */
    public modules(): Promise<string> {
        let params = {
            context: {}
        }
        return this.sendRequest("/web/session/modules", params)
    }


    /**
     * Login a la database
     * @param db Base de datos
     * @param login Usuario
     * @param password contraseña
     */
    public login(db: string, login: string, password: string) {
        let params = {
            db: db,
            login: login,
            password: password,
            base_location: this.odoo_server,
            context: {}
        };
        return this.sendRequest("/web/session/authenticate", params)
    }

    /**---------------------CRUD de Instancias en modelos------------------------- */

    /**
     * Crea una nueva entrada
     * @param model Nombre del modelo
     * @param mArgs Campos y sus valores
     */
    public createRecord(model: string, mArgs: any) {
        let args = [mArgs];
        return this.call(model, "create", args, null)
    }

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
    public getRecord(model: string, domain: any, fields: any, limit: number, offset: any, sort: string) {
        let params = {
            model: model,
            fields: fields,
            domain: domain,
            offset: offset,
            limit: limit,
            sort: sort,
            context: this.getContext()
        };
        return this.sendRequest("/web/dataset/search_read", params);
    }


    /**
     * Borra una entrada con id:x
     * @param model Nombre del modelo
     * @param id Id del elemento a borrar
     */
    public deleteRecord(model: string, id: number) {
        let mArgs = [id]
        return this.call(model, "unlink", mArgs, null)
    }


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
    public updateRecord(model: string, id: number, mArgs: any) {
        let args = [
            [id], mArgs
        ]
        return this.call(model, "write", args, null)
    }

    /**------------Fin del CRUD------------------- */

    /**----------------Metodos para el proyecto de Gestión de Ventas------------ */
    /**
     * Confirma una venta y crea una transferencia del producto en el inventario
     * 
     * @param order_id //Id de Venta
     */
    public saleConfirm(order_id: number) {
        this.call('sale.order', "action_confirm", [order_id], {}).then((res: any) => {
            console.log(JSON.parse(res._body))
        });
    }

    /**
     * Creamos factura para la venta con id pasado por parametro
     * @param invoice_id //Id de Factura
     */

    public createInvoiceForSale(invoice_id: number) {
        this.call('account.invoice', "action_invoice_open", [invoice_id], {});
        //   this.call('account.payment', "action_invoice_open", [invoice_id], {}).then((res: any) => {
        //     console.log(JSON.parse(res._body))
        //   });
    }
    
    public validateAndPay(invoice_id:number){
        this.call('account.invoice',"pay_and_reconcile",[invoice_id, 7],{});
    }

    /** --------------------Otros metodos utiles ------------------*/

    /**
     * @param model Nombre del modelo
     * @param id Id del dato que quieres cargar 
     */
    public load(model: string, id: number): Promise<any> {
        let params = {
            model: model,
            id: id,
            fields: [],
            context: this.getContext()
        }
        return this.sendRequest("/web/dataset/load", params)
    }

    public check(): Promise<string> {
        let params = {
            context: this.getContext()
        }
        return this.sendRequest("/web/session/check", params)
    }


    /**
     * Destruye la sesion 
     */
    public destroy() {
        let params = {
            context: {}
        }
        return this.sendRequest("/web/session/destroy", params)
    }



    /**
     * Reads that perticular fields of that particular ID
     * @param model Nombre del modelo
     * @param id Id del objeto a leer
     * @param mArgs Array de los
     */

    public read(model: string, id: Array<number>, mArgs: Array<string>): Promise<any> {
        let args = [
            id, mArgs
        ]
        return this.call(model, 'read', args)
    }

    /**
     * Obriene el contexto
     */
    private getContext() {
        let response = localStorage.getItem("token");
        let jsonData = JSON.parse(response);
        let context = jsonData["user_context"];
        return context;
    }

}