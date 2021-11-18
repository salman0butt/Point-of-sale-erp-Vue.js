import http from "@/http-common";
import Helper from "@/helpers/Helper";

class BrandService extends Helper {
    getAll(page, per_page) {
        let url = "/brands";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/brands/${id}`);
    }

    create(data) {
        return http.post("/brands", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/brands/${id}`, data);
    }

    delete(id) {
        return http.delete(`/brands/${id}`);
    }
}

export default new BrandService();
