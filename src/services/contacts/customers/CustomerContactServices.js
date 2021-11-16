import http from "../../../http-common";
import Helper from "@/helpers/Helper";

class CustomerContactServices extends Helper {
    getCustomerContacts(uuid) {

        let url = "/contacts/customer/" + uuid;


        return http.get(url);
    }

    get(uuid) {
        return http.get(`addresses-single/${uuid}`);
    }

    store(data) {
        return http.post("/contacts/customer", data);
    }

    update(id, data) {
        return http.put(`addresses-single/${id}`, data);
    }

    delete(id) {
        return http.delete(`addresses/${id}`);
    }
}

export default new CustomerContactServices();
