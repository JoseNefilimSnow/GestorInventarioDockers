# -*- coding: utf-8 -*-

from odoo import models, fields, api

class posicionamientoinventario(models.Model):
    _name = 'posicionamientoinventario.posicionamientoinventario'

    pos = fields.One2many("posicionamientoinventarioub.ubicacion","ub",string="Posicion", required=True)

class posicionamientoinventarioub(models.Model):
    _name = "posicionamientoinventarioub.ubicacion"
    _rec_name = "ub"

    ub = fields.Char(string="Ubicacion", size=100, required=True)


class posicionamientoinventarioi(models.Model):
    _inherit = 'stock.location'
    _name = 'stock.location'

    pos2 = fields.Many2one("posicionamientoinventario.posicionamientoinventario")