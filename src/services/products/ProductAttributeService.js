import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ProductAttributeService extends Helper {
    getAll(page, per_page) {
        let url = "/product-attributes";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/product-attributes/${id}`);
    }

    // getProductOptions() {
    //     return http.get('product-options', super.selectedBranch());
    // }

    create(data) {
        return http.post("/product-attributes", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/product-attributes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/product-attributes/${id}`);
    }
}

export default new ProductAttributeService();
