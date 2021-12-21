import http from "@/http-common";
import Helper from "@/helpers/Helper";

class DamageService extends Helper {
    getAll(page, per_page) {
        let url = "/product-damages";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/product-damages/${id}`);
    }

    getAllSuppliers() {
        return http.get('/supplier', super.selectedBranch());
    }

    searchProduct(query) {
        let url = "/products/search/" + query;

        return http.get(url, super.selectedBranch());
    }

    create(data) {
        return http.post("/product-damages", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/product-damages/${id}`, data, super.selectedBranch());
    }

    delete(id) {
        return http.delete(`/product-damages/${id}`);
    }
}

export default new DamageService();
