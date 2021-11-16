import http from "../../../http-common";
import Helper from "@/helpers/Helper";

class CustomerAddressServices extends Helper {
    getCustomerAddresses(uuid, page, per_page) {

        let url = "/addresses/customer/" + uuid;
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url);
    }

    get(uuid) {
        return http.get(`addresses-single/${uuid}`);
    }

    store(data) {
        return http.post("/addresses/customer", data);
    }

    update(id, data) {
        return http.put(`addresses-single/${id}`, data);
    }

    delete(id) {
        return http.delete(`addresses/${id}`);
    }
}

export default new CustomerAddressServices();
