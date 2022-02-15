import http from "@/http-common";
import Helper from "@/helpers/Helper";

class PurchaseOrderServices extends Helper {
    getAll(page, per_page) {
        let url = "/purchase-orders";
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url);
    }

    getAllSuppliers() {
        return http.get("/supplier?all_data=true");
    }

    getAllTaxes() {
        return http.get("/taxes?all_data=true");
    }

    getAllBranches() {
        return http.get("/branches", super.selectedBranch());
    }
    getAllCustomers() {
        return http.get("/customers?active=active");
    }

    get(id) {
        return http.get(`/purchase-orders/${id}`);
    }

    create(data) {
        return http.post("/purchase-orders", data, super.selectedBranch());
    }

    update(id, data) {
        return http.post(`/purchase-orders/${id}`, data, super.selectedBranch());
    }

    delete(id) {
        return http.delete(`/purchase-orders/${id}`);
    }
}

export default new PurchaseOrderServices();
