# -*- coding: utf-8 -*-
{
    'name': "Posicionamiento Inventario",

    'summary': """
        Modulo de Posicionamiento de Inventario""",

    'description': """
        Modulo de Posicionamiento de Inventario!
    """,

    'author': "Valper",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Posicionamiento',
    'version': '1.0',

    # any module necessary for this one to work correctly
    'depends': ['base','stock'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'views/inherited_form_view.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],

    'installable': True,
    'auto_install': False,
    'application': True
}
