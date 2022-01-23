import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TaxService extends Helper {
    getAll(page, per_page) {
        let url = "/taxes";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/taxes/${id}`);
    }

    create(data) {
        return http.post("/taxes", data);
    }

    update(id, data) {
        return http.patch(`/taxes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/taxes/${id}`);
    }
}

export default new TaxService();
