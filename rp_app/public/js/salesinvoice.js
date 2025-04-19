frappe.ui.form.on("Sales Invoice", {
    validate: function(frm) {
        let has_gst_exempted = false;
        let has_non_exempted = false;

        (frm.doc.items || []).forEach(item => {
            console.log("Item:", item.item_code, "| GST Exempted:", item.custom_is_gst_exempt);

            if (item.custom_is_gst_exempt) {
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
