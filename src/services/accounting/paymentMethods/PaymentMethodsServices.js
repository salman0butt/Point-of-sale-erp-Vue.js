import http from "../../../http-common";
import Helper from "@/helpers/Helper";

class PaymentMethodsServices extends Helper {
    getAll(page, per_page) {
        let url = "/paymentMethod";
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url);
    }


    get(id) {
        return http.get(`/paymentMethod/${id}`);
    }

    create(data) {
        return http.post("/paymentMethod", data);
    }

    update(id, data) {
        return http.patch(`/paymentMethod/${id}`, data);
    }

    delete(id) {
        return http.delete(`/paymentMethod/${id}`);
    }
}

export default new PaymentMethodsServices();
