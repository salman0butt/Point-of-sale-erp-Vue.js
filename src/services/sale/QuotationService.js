import http from "@/http-common";
import Helper from "@/helpers/Helper";

class QuotationService extends Helper {
    getAll(page, per_page) {
        let url = "/quotations";
        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);
        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);
        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/quotations/${id}`);
    }

    create(data, config) {
        config = Object.assign(config, super.selectedBranch());
        return http.post("/quotations", data, config);
    }

    update(id, data, config) {
        return http.post(`/quotations/${id}`, data, config);
    }
    updateStatus(id) {
        return http.put(`/quotations-approved/${id}`);
    }
    delete(id) {
        return http.delete(`/quotations/${id}`);
    }
}

export default new QuotationService();
