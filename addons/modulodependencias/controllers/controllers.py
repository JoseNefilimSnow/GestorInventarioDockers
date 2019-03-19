# -*- coding: utf-8 -*-
from odoo import http

# class Modulodependencias(http.Controller):
#     @http.route('/modulodependencias/modulodependencias/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/modulodependencias/modulodependencias/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('modulodependencias.listing', {
#             'root': '/modulodependencias/modulodependencias',
#             'objects': http.request.env['modulodependencias.modulodependencias'].search([]),
#         })

#     @http.route('/modulodependencias/modulodependencias/objects/<model("modulodependencias.modulodependencias"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('modulodependencias.object', {
#             'object': obj
#         })