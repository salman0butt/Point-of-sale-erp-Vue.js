import http from "../../http-common";
import Helper from "@/helpers/Helper";

class CustomerAddressServices extends Helper {
    getCustomerAddresses(uuid, page, per_page) {

        let url = "/customer-addresses/" + uuid;
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url);
    }

    get(id) {
        return http.get(`/customers/${id}`);
    }

    store(data) {
        return http.post("/customer-addresses", data);
    }

    update(id, data) {
        return http.put(`/customers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/assets/${id}`);
    }
}

export default new CustomerAddressServices();
