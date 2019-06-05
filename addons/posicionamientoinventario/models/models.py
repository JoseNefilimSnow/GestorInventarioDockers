# -*- coding: utf-8 -*-

from odoo import models, fields, api

# class posicionamientoinventario(models.Model):
#     _name = 'posicionamientoinventario.posicionamientoinventario'
#     _rec_name = "nombre"

#     nombre = fields.Char(string="Nombre de Lista", size=100, required=True)

#     pos = fields.One2many("posicionamientoinventarioub.ubicacion","ub_id",string="Lista Posiciones", required=True)

class posicionamientoinventario(models.Model):
    _name = "posicionamientoinventario.placeholder"
    _rec_name = "code"

    id_code = fields.Integer(string="Id")
    code = fields.Char(string="Cod. Ubicacion")

class posicionamientoinventarioi(models.Model):
    _inherit = 'product.template'
    _name = 'product.template'

    ub = fields.Many2one("posicionamientoinventario.placeholder",string="Ubicacion", required=True)