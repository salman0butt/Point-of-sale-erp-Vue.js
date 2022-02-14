import http from "@/http-common";

class SettingService {

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

export default new SettingService();
