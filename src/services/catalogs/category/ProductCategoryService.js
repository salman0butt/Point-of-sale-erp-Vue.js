import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ProductCategoryService extends Helper {
    getAll(page, per_page) {
        let url = "/product-categories";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/product-categories/${id}`);
    }

    getProductCategoryOptions() {
        return http.get('/product-categories-options', super.selectedBranch());
    }

    create(data, config) {
        config = Object.assign(config, super.selectedBranch());
        return http.post("/product-categories", data, config);
    }

    update(id, data, config) {
        return http.post(`/product-categories/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/product-categories/${id}`);
    }
}

export default new ProductCategoryService();
