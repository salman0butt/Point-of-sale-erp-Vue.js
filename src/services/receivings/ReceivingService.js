import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ReceivingService extends Helper {
    getAll(page, per_page) {
        let url = "/receivings";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/receivings/${id}`, super.selectedBranch());
    }

    getAllSuppliers() {
        return http.get('/supplier', super.selectedBranch());
    }

    getAllProducts() {
        return http.get('/receiving-options', super.selectedBranch());
    }

    searchProduct(query) {
        let url = "/products/search/" + query;

        return http.get(url, super.selectedBranch());
    }

    create(data) {
        return http.post("/receivings", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/receivings/${id}`, data, super.selectedBranch());
    }

    delete(id) {
        return http.delete(`/receivings/${id}`);
    }
}

export default new ReceivingService();
