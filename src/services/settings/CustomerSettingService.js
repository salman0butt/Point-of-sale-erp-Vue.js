import http from "@/http-common";

class CustomerSettingService {

    getAll(type) {
        return http.get('/settings', {
            params: {
                type: type,
            }
        });
    }



    update(data) {
        return http.patch(`/settings`, data);
    }

}

export default new CustomerSettingService();
