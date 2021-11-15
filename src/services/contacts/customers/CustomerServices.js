import http from "../../../http-common";
import Helper from "@/helpers/Helper";

class CustomerServices extends Helper {
    getAll(page, per_page) {
        let url = "/customers";
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
        return http.get(`/customers/${id}`);
    }

    create(data) {
        return http.post("/customers", data);
    }

    update(id, data) {
        return http.put(`/customers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/assets/${id}`);
    }
}

export default new CustomerServices();
