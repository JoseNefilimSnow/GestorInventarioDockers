# -*- coding: utf-8 -*-
from odoo import http

# class Posicionamientoinventario(http.Controller):
#     @http.route('/posicionamientoinventario/posicionamientoinventario/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/posicionamientoinventario/posicionamientoinventario/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('posicionamientoinventario.listing', {
#             'root': '/posicionamientoinventario/posicionamientoinventario',
#             'objects': http.request.env['posicionamientoinventario.posicionamientoinventario'].search([]),
#         })

#     @http.route('/posicionamientoinventario/posicionamientoinventario/objects/<model("posicionamientoinventario.posicionamientoinventario"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('posicionamientoinventario.object', {
#             'object': obj
#         })