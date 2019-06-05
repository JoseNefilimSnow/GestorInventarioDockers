# -*- coding: utf-8 -*-

from odoo import models, fields, api

class reserva(models.Model):
    _name = 'purchase.order'
    _inherit = 'purchase.order'
    
    client = fields.Many2one("res.partner")

# class reserva2(models.Model):
#     _name = 'sale.order'
#     _inherit = 'sale.order'

#     @api.multi
#     def action_confirm(self):
#     result = super(SaleOrder, self).action_confirm()
#     for order in self:
#         order.picking_ids.write({'your_field_in_picking': order.your_field_in_sale})

#     return result