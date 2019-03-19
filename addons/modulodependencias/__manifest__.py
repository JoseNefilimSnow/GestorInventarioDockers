# -*- coding: utf-8 -*-
{
    'name': "Modulo de Dependencias",

    'summary': """
        Instalador de modulos necesarios""",

    'description': """
        Este modulo instala los modulos que vamos a usar para nuestro proyecto de empresa.
    """,

    'author': "Valper",
    'website': "http://valpersoluciones.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Dependencias',
    'version': '1.0',

    # any module necessary for this one to work correctly
    'depends': ['base','stock','sale_management','mail','account_invoicing','purchase','hr','contacts'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'installable' : True,
    'auto_install' : False,
    'application': True
}