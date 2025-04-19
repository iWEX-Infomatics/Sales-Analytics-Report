import frappe
from frappe import _

def validate_gst_items(doc, method):
    has_exempted = any(i.custom_is_gst_exempt for i in doc.items)
    has_non_exempted = any(not i.custom_is_gst_exempt for i in doc.items)

    if has_exempted and has_non_exempted:
        frappe.throw(_("GST Exempted and Non-Exempted items cannot be billed together."))

