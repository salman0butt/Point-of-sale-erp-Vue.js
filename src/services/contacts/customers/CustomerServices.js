import http from "@/http-common";
import Helper from "@/helpers/Helper";

class CustomerServices extends Helper {
    getAll(page, per_page) {
        let url = "/customers";
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    getAllCustomers() {
      return http.get("/customers?active=active");
  }


    get(id) {
        return http.get(`/customers/${id}`);
    }

    create(data) {
        return http.post("/customers", data);
    }

    quickAdd(data) {
        return http.post("/customers/quick-add", data);
    }

    update(id, data) {
        return http.put(`/customers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/customers/${id}`);
    }

    search(name) {
        return http.get(`/customers/search/${name}`);

    }

}

export default new CustomerServices();
