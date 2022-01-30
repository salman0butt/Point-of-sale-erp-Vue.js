import http from "@/http-common";
import Helper from "@/helpers/Helper";

class CustomerAddressServices extends Helper {
    getCustomerAddresses(uuid, page, per_page) {

        let url = "/notes/supplier/" + uuid;
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url);
    }

    get(uuid) {
        return http.get(`notes-single/${uuid}`);
    }

    store(data) {
        return http.post("/notes/supplier", data);
    }

    update(id, data) {
        return http.put(`notes-single/${id}`, data);
    }

    delete(id) {
        return http.delete(`notes/${id}`);
    }
}

export default new CustomerAddressServices();