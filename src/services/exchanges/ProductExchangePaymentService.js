import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ProductExchangePaymentService extends Helper {
    getAll(page, per_page) {
        let url = "/product-exchange-payments";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    getExchangePayments(id) {
      return http.get(`/product-exchange-payments/exchange/${id}`);
    }

    get(id) {
        return http.get(`/product-exchange-payments/${id}`, super.selectedBranch());
    }

    store(data) {
        return http.post("/product-exchange-payments", data);
    }

    update(id, data) {
        return http.patch(`/product-exchange-payments/${id}`, data);
    }

    delete(id) {
        return http.delete(`/product-exchange-payments/${id}`);
    }
}

export default new ProductExchangePaymentService();
