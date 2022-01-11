import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ModifierService extends Helper {
    getAll(page, per_page) {
        let url = "/modifiers";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/modifiers/${id}`);
    }

    create(data) {
        return http.post("/modifiers", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/modifiers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/modifiers/${id}`);
    }
}

export default new ModifierService();
