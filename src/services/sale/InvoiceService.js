import http from "@/http-common";
import Helper from "@/helpers/Helper";

class InvoiceService extends Helper {
    getAll(page, per_page, customer_id = null) {
        let url = "/invoices";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        if (customer_id !== '' && customer_id !== undefined && customer_id !== null)
            url = super.updateQueryStringParameter(url, "customer_id", customer_id);

        url = super.updateQueryStringParameter(url, "status", "approved");

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/invoices/${id}`);
    }

    search(query){
       return http.get(`/invoices/search/${query}`, super.selectedBranch());
    }

    getCreateRequisites() {

        return http.get(`/invoices/create`);
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
