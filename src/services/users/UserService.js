import http from "@/http-common";
import Helper from "@/helpers/Helper";

class UserService extends Helper {
    getAll(page, per_page) {
        let url = "/users";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    getLoggedInUser() {
        return http.get("/users/me");
    }

    getCreateDetail() {
      return http.get("/employees-create", super.selectedBranch());
    }

    get(id) {
        return http.get(`/users/${id}`, super.selectedBranch());
    }

    create(data, config) {
      config = Object.assign(config, super.selectedBranch());
        return http.post("/users", data, config);
    }

    update(id, data, config) {
        return http.post(`/users/${id}`, data, config);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }
}

export default new UserService();
