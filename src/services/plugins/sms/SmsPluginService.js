import http from "@/http-common";
import Helper from "@/helpers/Helper";

class SmsPluginService extends Helper {
    getAll(page, per_page) {
        let url = "/plugins/sms/index";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/brands/${id}`);
    }
}

export default new SmsPluginService();
