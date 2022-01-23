import http from "@/http-common";
import Helper from "@/helpers/Helper";

class InvoiceService extends Helper {
    getAll(page, per_page) {
        let url = "/invoices";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        url = super.updateQueryStringParameter(url, "status", "approved");

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/invoices/${id}`);
    }

    create(data, config) {
        config = Object.assign(config, super.selectedBranch());
        return http.post("/invoices", data, config);
    }

    update(id, data, config) {
        return http.post(`/invoices/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/invoices/${id}`);
    }
}

export default new InvoiceService();