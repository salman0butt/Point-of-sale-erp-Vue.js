import http from "@/http-common";
import Helper from "@/helpers/Helper";

class PaymentInvoiceService extends Helper {

    getAll(page, per_page) {
        let url = "/invoice-payments";
        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);
        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);
        return http.get(url);
    }

    get(id) {
        return http.get(`/invoice-payments/${id}`);
    }

    create() {
        return http.get(`/invoice-payments/create`);
    }

    store(data) {
        return http.post("/invoice-payments", data);
    }

    update(id, data) {
      return http.patch(`/invoice-payments/${id}`, data);
    }

    getInvoicePayments(id) {
        return http.get(`/invoice-payments/invoice/${id}`);
    }
    delete(id) {
        return http.delete(`/invoice-payments/${id}`);
    }


}

export default new PaymentInvoiceService();
