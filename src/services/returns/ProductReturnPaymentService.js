import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ProductReturnPaymentService extends Helper {
    getAll(page, per_page) {
        let url = "/product-return-payments";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    getReturnPayments(id) {
      return http.get(`/product-return-payments/return/${id}`, super.selectedBranch());
    }

    get(id) {
        return http.get(`/product-return-payments/${id}`, super.selectedBranch());
    }

    store(data) {
        return http.post("/product-return-payments", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/product-return-payments/${id}`, data, super.selectedBranch());
    }

    delete(id) {
        return http.delete(`/product-return-payments/${id}`);
    }
}

export default new ProductReturnPaymentService();
