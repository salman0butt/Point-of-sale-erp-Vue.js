import http from "../../http-common";
import Helper from "@/helpers/Helper";

class SupplierServices extends Helper {
    getAll(page, per_page) {
        let url = "/supplier";
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, {
            headers: {
                "selected-branches": localStorage.getItem("selected_branches"),
            },
        });
    }
    get(id) {
        return http.get(`/supplier/${id}`);
    }

    store(data) {
        return http.post("/supplier", data, {
            headers: {
                "selected-branches": localStorage.getItem("selected_branches"),
            },
        });
    }

    update(id, data) {
        return http.put(`/supplier/${id}`, data);
    }

    // delete(id) {
    //     return http.delete(`/assets/${id}`);
    // }
}

export default new SupplierServices();
