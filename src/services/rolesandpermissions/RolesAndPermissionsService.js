import http from "../../http-common";
import Helper from "@/helpers/Helper";

class RolesAndPermissionsService extends Helper {
    getAllPaginate(page, per_page) {
        let url = "/roles";
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url);
    }
    getAll() {
        return http.get(`/roles`);
    }


    getAllPermissions() {
        return http.get(`/permissions`);
    }



    get(id) {
        return http.get(`/roles/${id}`);
    }

    create(data) {
        return http.post("/roles", data);
    }

    update(id, data) {
        return http.put(`/roles/${id}`, data);
    }


}

export default new RolesAndPermissionsService();
