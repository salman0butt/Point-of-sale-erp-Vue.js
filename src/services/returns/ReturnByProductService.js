import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ReturnByProductService extends Helper {
    getAll(page, per_page) {
        let url = "/product-returns";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/product-returns/${id}`, super.selectedBranch());
    }

    create(data, config={}) {
      config = Object.assign(config,super.selectedBranch());
        return http.post("/product-returns", data, config);
    }

    update(id, data, config={}) {
      config = Object.assign(config,super.selectedBranch());
        return http.post(`/product-returns/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/product-returns/${id}`);
    }
}

export default new ReturnByProductService();
