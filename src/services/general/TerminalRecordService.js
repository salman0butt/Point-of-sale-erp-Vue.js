import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TerminalRecordService extends Helper {
    getAll(page, per_page) {
        let url = "/terminal-record";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/terminal-record/${id}`);
    }

    create(data) {
        return http.post("/terminal-record", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/terminal-record/${id}`, data);
    }

    delete(id) {
        return http.delete(`/terminal-record/${id}`);
    }
}

export default new TerminalRecordService();
