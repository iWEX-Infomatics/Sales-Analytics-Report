frappe.ui.form.on("Sales Invoice Item", {
    item_code: function(frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        if (row.item_code) {
            frappe.db.get_value("Item", row.item_code, "custom_is_gst_exempted", (r) => {
                if (r && r.custom_is_gst_exempted !== undefined) {
                    frappe.model.set_value(cdt, cdn, "custom_is_gst_exempt", r.custom_is_gst_exempted);
                }
            });
        }
    }
});

frappe.ui.form.on("Sales Invoice", {
    validate: function(frm) {
        let has_gst_exempted = false;
        let has_non_exempted = false;

        (frm.doc.items || []).forEach(item => {
            const is_exempt = Boolean(item.custom_is_gst_exempt);

            if (is_exempt) {
                has_gst_exempted = true;
            } else {
                has_non_exempted = true;
            }
        });

        if (has_gst_exempted && has_non_exempted) {
            frappe.throw("GST Exempted and Non-Exempted items cannot be billed together. Please create separate invoices.");
        }
    }
});
