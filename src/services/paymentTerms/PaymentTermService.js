import http from "@/http-common";
import Helper from "@/helpers/Helper";

class PaymentTermService extends Helper {
    getAll(page, per_page) {
        let url = "/payment-terms";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/payment-terms/${id}`);
    }

    create(data) {
        return http.post("/payment-terms", data);
    }

    update(id, data) {
        return http.patch(`/payment-terms/${id}`, data);
    }

    delete(id) {
        return http.delete(`/payment-terms/${id}`);
    }
}

export default new PaymentTermService();
