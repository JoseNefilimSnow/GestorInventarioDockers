# -*- coding: utf-8 -*-
from odoo import http

# class PackingAndPackingList(http.Controller):
#     @http.route('/packing_and_packing_list/packing_and_packing_list/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/packing_and_packing_list/packing_and_packing_list/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('packing_and_packing_list.listing', {
#             'root': '/packing_and_packing_list/packing_and_packing_list',
#             'objects': http.request.env['packing.packing'].search([]),
#         })

#     @http.route('/packing_and_packing_list/packing_and_packing_list/objects/<model("packing.packing"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('packing_and_packing_list.object', {
#             'object': obj
#         })