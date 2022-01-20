import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TaxService extends Helper {
    getAll() {
        let url = "/taxes";
        return http.get(url);
    }

    get(id) {
        return http.get(`/taxes/${id}`);
    }

    create(data, config) {
        config = Object.assign(config, super.selectedBranch());
        return http.post("/taxes", data, config);
    }

    update(id, data, config) {
        return http.post(`/taxes/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/taxes/${id}`);
    }

    defaultTax() {
        return http.get(`/default-tax`);

    }
}

export default new TaxService();
