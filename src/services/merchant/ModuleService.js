import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ModuleService extends Helper {
    index() {
        let url = "/modules";

        return http.get(url);
    }

    get(id) {
        return http.get(`/invoices/${id}`);
    }

    getCreateRequisites() {

        return http.get(`/invoices/create`);
    }

    create(data, config) {
        config = Object.assign(config, super.selectedBranch());
        return http.post("/invoices", data, config);
    }

    update(id, data, config) {
        return http.post(`/invoices/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/invoices/${id}`);
    }
}

export default new ModuleService();
