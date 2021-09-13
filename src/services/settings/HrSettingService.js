import http from "@/http-common";

class HrSettingService {

  getAll() {
    return http.get('/hr-settings');
  }

  getSettings(ids) {
    return http.get(`/hr-settings/${ids}`);
  }

  update(data) {
    return http.patch(`/hr-settings`, data);
  }

}

export default new HrSettingService();
