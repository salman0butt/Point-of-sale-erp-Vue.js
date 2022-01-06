import http from "@/http-common";
import Helper from "@/helpers/Helper";

class OfferService extends Helper {
    getAll(page, per_page) {
        let url = "/offers";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/offers/${id}`);
    }

    getAllOfferOptions() {
        return http.get("/offers-options");
    }

    create(data) {
        return http.post("/offers", data, super.selectedBranch());
    }

    update(id, data) {
        return http.post(`/offers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/offers/${id}`);
    }
}

export default new OfferService();
