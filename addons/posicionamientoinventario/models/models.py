# -*- coding: utf-8 -*-

from odoo import models, fields, api

class posicionamientoinventario(models.Model):
    _name = 'posicionamientoinventario.posicionamientoinventario'
    _rec_name = "nombre"

    nombre = fields.Char(string="Nombre de Lista", size=100, required=True)

    pos = fields.One2many("posicionamientoinventarioub.ubicacion","ub_id",string="Lista Posiciones", required=True)

class posicionamientoinventarioub(models.Model):
    _name = "posicionamientoinventarioub.ubicacion"
    _rec_name = "ub"

    ub_id=fields.Integer(string="Id")
    ub = fields.Many2one("posicionamientoinventariopl.placeholder",string="Ubicacion")

class posicionamientoinventariopl(models.Model):
    _name = "posicionamientoinventariopl.placeholder"
    _rec_name = "code"

    id_code = fields.Integer(string="Id")
    code = fields.Char(string="Cod. Ubicacion")

class posicionamientoinventarioi(models.Model):
    _inherit = 'product.template'
    _name = 'product.template'

    pos2 = fields.Many2one("posicionamientoinventario.posicionamientoinventario")