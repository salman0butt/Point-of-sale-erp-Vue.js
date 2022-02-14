import http from "@/http-common";
import Helper from "@/helpers/Helper";

class JournalServices extends Helper {

    getAll(page, per_page) {
        let url = "/journal";

        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/journal/${id}`);
    }

    preRequisites() {
        return http.get(`/journal/create`);
    }

    create(data, config) {
        config = Object.assign(config, super.selectedBranch());
        return http.post("/journal", data, config);
    }

    update(id, data, config) {
        return http.post(`/journal/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/journal/${id}`);
    }

}

export default new JournalServices();
