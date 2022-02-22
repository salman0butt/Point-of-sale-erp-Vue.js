import http from "@/http-common";
import Helper from "@/helpers/Helper";

class CurrencyDenominationService extends Helper {
    getAll() {
        let url = "/currency-denomination";
        return http.get(url);

    }

    store(data) {
        return http.post("/currency-denomination", data);
    }

    update(id, data) {
        return http.patch(`/currency-denomination/${id}`, data);
    }

    delete(id) {
        return http.delete(`/currency-denomination/${id}`);
    }
}

export default new CurrencyDenominationService();
