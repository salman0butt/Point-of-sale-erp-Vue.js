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

    create(data) {
        return http.post("/product-categories", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/product-categories/${id}`, data);
    }

    delete(id) {
        return http.delete(`/product-categories/${id}`);
    }
}

export default new ProductCategoryService();
