import http from "@/http-common";

class HrSettingService {

  getAll() {
    return http.get('/hr-settings');
  }

  update(data) {
    return http.patch(`/hr-settings`, data);
  }

}

export default new HrSettingService();
