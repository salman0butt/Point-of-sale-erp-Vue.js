import http from "@/http-common";
import Helper from "@/helpers/Helper";

class PaymentInvoiceService extends Helper {
    getAll() {
        let url = "/invoice-payments";


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

    update(id, data, config) {
        return http.post(`/invoice-payments/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/invoice-payments/${id}`);
    }
}

export default new PaymentInvoiceService();
