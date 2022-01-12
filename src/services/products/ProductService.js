import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ProductService extends Helper {
    getAll(page, per_page) {
        let url = "/products";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/products/${id}`, super.selectedBranch());
    }

    getProductOptions() {
        return http.get('product-options', super.selectedBranch());
    }

    create(data, config) {
      config = Object.assign(config,super.selectedBranch());
        return http.post("/products", data, config);
    }

    update(id, data, config) {
      config = Object.assign(config,super.selectedBranch());
        return http.post(`/products/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }
}

export default new ProductService();
