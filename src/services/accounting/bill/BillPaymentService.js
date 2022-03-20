import http from "@/http-common";
import Helper from "@/helpers/Helper";

class BillPaymentService extends Helper {

    getAll(page, per_page) {
        let url = "/bill-payments";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url);
    }

    get(id) {
        return http.get(`/bill-payments/${id}`);
    }

    create() {
        return http.get(`/bill-payments/create`);
    }

    store(data) {
        return http.post("/bill-payments", data);
    }

    update(id, data) {
      return http.post(`/bill-payments/${id}`, data);
    }

    getBillPayments(id) {
        return http.get(`/bill-payments/bill/${id}`);
    }

    delete(id) {
        return http.delete(`/bill-payments/${id}`);
    }


}

export default new BillPaymentService();
