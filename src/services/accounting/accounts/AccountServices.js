import http from "../../../http-common";
import Helper from "@/helpers/Helper";

class AccountServices extends Helper {
    getAll(page, per_page) {
        let url = "/account";
        if (page !== '')
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '')
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        url = super.updateQueryStringParameter(url, "active", "active");
        return http.get(url);
    }

    getTreeStructure() {
        let url = "/account-tree-structure";
        return http.get(url);

    }

    getActiveAccounts(active) {
        let url = "/account";
        if (active !== '')
            url = super.updateQueryStringParameter(url, "active", active);

        return http.get(url);
    }


    get(id) {
        return http.get(`/account/${id}`);
    }

    create(data) {
        return http.post("/account", data);
    }

    update(id, data) {
        return http.patch(`/account/${id}`, data);
    }
    getAllAccountTypes() {
        return http.get(`/account-types`);
    }

    getAllExpenseAccount() {
        return http.get(`/account-expense`);

    }



    delete(id) {
        return http.delete(`/account/${id}`);
    }


}

export default new AccountServices();
