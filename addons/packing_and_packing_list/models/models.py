# -*- coding: utf-8 -*-

from odoo import models, fields, api

class packing_and_packing_list(models.Model):
    _name = 'packing.packing'

    employee = fields.Many2one("res.partner",string="Empleado",domain=[('customer','=',True)], required=True)
    client = fields.Many2one("res.partner",string="Cliente",domain=[('customer','=',True)], required=True)
    origin = fields.Many2many("stock.picking", string="Packs adjuntos")
    type = fields.Char(string="Tipo de Caja", required=True)
    barcode = fields.Text(string="Referencia de Caja")
    active = fields.Boolean(string="Abierta")


