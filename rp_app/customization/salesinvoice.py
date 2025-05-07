import frappe
from frappe import _

def validate_gst_items(doc, method):
    has_exempted = any(item.custom_is_gst_exempt for item in doc.items)
    has_non_exempted = any(not item.custom_is_gst_exempt for item in doc.items)

    if has_exempted and has_non_exempted:
        frappe.throw(_("GST Exempted and Non-Exempted items cannot be billed together."))
