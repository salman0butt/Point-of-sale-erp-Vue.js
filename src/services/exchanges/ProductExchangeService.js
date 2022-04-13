import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ProductExchangeService extends Helper {
    getAll(page, per_page) {
        let url = "/product-exchanges";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/product-exchanges/${id}`, super.selectedBranch());
    }

    create(data, config={}) {
      config = Object.assign(config,super.selectedBranch());
        return http.post("/product-exchanges", data, config);
    }

    update(id, data, config={}) {
      config = Object.assign(config,super.selectedBranch());
        return http.patch(`/product-exchanges/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/product-exchanges/${id}`);
    }
}

export default new ProductExchangeService();
