# -*- coding: utf-8 -*-
from odoo import http

# class Reserva(http.Controller):
#     @http.route('/reserva/reserva/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/reserva/reserva/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('reserva.listing', {
#             'root': '/reserva/reserva',
#             'objects': http.request.env['reserva.reserva'].search([]),
#         })

#     @http.route('/reserva/reserva/objects/<model("reserva.reserva"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('reserva.object', {
#             'object': obj
#         })