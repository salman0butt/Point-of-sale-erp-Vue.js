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

    create(data, config) {
      config = Object.assign(config,super.selectedBranch());
        return http.post("/brands", data, config);
    }

    update(id, data, config) {
        return http.post(`/brands/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/brands/${id}`);
    }
}

export default new BrandService();
