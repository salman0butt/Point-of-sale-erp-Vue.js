import http from "../../http-common";
import Helper from "@/helpers/Helper";

class RolesAndPermissionsService extends Helper {
    getAll(page, per_page) {
        let url = "/roles";
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url);
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

    // update(id, data) {
    //     return http.patch(`/account/${id}`, data);
    // }


}

export default new RolesAndPermissionsService();
