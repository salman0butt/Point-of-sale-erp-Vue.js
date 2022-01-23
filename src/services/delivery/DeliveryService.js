import http from "@/http-common";
import Helper from "@/helpers/Helper";

class DeliveryService extends Helper {
    getAll(page, per_page) {
        let url = "/deliveries";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }
    getAllTaxes() {
        return http.get("/taxes", {
            params: {
                "all_data": true
            }
        });
    }
    
    get(id) {
        return http.get(`/deliveries/${id}`);
    }

    create(data) {
        return http.post("/deliveries", data);
    }

    update(id, data) {
        return http.patch(`/deliveries/${id}`, data);
    }

    delete(id) {
        return http.delete(`/deliveries/${id}`);
    }
}

export default new DeliveryService();
