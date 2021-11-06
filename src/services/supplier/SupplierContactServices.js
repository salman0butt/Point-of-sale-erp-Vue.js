import http from "../../http-common";
import Helper from "@/helpers/Helper";

class SupplierContactServices extends Helper {
    getSupplierContacts(uuid) {

        let url = "/contacts/supplier/" + uuid;


        return http.get(url);
    }

    get(uuid) {
        return http.get(`addresses-single/${uuid}`);
    }

    store(data) {
        return http.post("/contacts/supplier", data);
    }

    update(id, data) {
        return http.put(`addresses-single/${id}`, data);
    }

    delete(id) {
        return http.delete(`addresses/${id}`);
    }
}

export default new SupplierContactServices();
