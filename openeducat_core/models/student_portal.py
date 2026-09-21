###############################################################################
#
#    OpenEduCat Inc
#    Copyright (C) 2009-TODAY OpenEduCat Inc(<https://www.openeducat.org>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Lesser General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
###############################################################################

from odoo import api, fields, models


class StudentPortal(models.Model):
    _inherit = 'res.partner'

    is_parent = fields.Boolean("Is a Parent")
    is_student = fields.Boolean("Is a Student")

    @api.onchange('is_parent')
    def _onchange_is_parent(self):
        if self.is_parent:
            self.is_student = False

    @api.onchange('is_student')
    def _onchange_is_student(self):
        if self.is_student:
            self.is_parent = False
