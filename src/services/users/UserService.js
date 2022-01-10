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

    getCreateDetail() {
      return http.get("/employees-create", super.selectedBranch());
    }

    get(id) {
        return http.get(`/users/${id}`, super.selectedBranch());
    }

    create(data) {
        return http.post("/users", data, super.selectedBranch());
    }

    update(id, data) {
        return http.post(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }
}

export default new UserService();
