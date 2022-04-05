import http from "@/http-common";
import Helper from "@/helpers/Helper";

class BranchTerminalServices extends Helper {
    getAll(page, per_page) {
        let url = "/branch-terminals";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/branch-terminals/${id}`);
    }

    getTerminalByBranch(id) {
        return http.get(`/branch-terminals-branch/${id}`);
    }

    create(data) {
        return http.post("/branch-terminals", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/branch-terminals/${id}`, data);
    }

    delete(id) {
        return http.delete(`/branch-terminals/${id}`);
    }
}

export default new BranchTerminalServices();
