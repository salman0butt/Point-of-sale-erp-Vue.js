import http from "../../../http-common";
import Helper from "@/helpers/Helper";

class SupplierEmailServices extends Helper {
    getSupplierEmails(uuid) {
        let url = "/emails/supplier/" + uuid;
        return http.get(url);
    }

    store(data) {
        return http.post("/emails/supplier", data);
    }

  
}

export default new SupplierEmailServices();
