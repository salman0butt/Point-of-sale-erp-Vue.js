import http from "../../http-common";
import Helper from "@/helpers/Helper";

class GroupServices extends Helper {
    getAll(page, per_page) {
        let url = "/groups";
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

    getActivegroups(active, module_type) {
        let url = "/groups";
        if (active !== '')
            url = super.updateQueryStringParameter(url, "active", active);

        if (module_type !== '')
            url = super.updateQueryStringParameter(url, "module_type", module_type);

        return http.get(url, {
            headers: {
                "selected-branches": localStorage.getItem("selected_branches"),
            },
        });

    }
    create(data) {
        return http.post("/groups", data);
    }
    get(id) {
        return http.get(`/groups/${id}`);
    }

    update(id, data) {
        return http.patch(`/groups/${id}`, data);
    }


}

export default new GroupServices();
