import http from "@/http-common";

class HrSettingService {

  getAll() {
    return http.get('/hr-settings');
  }

  getSettings(ids) {
    return http.get(`/hr-settings/${ids}`);
  }

  update(data) {
    return http.patch(`/settings`, data);
  }

  getDashboardSetting(card) {
    return http.get(`/setting-dashboard/${card}`);
  }

  updateDashboardSettings(data) {
    return http.patch(`/setting-dashboard`, data);
  }


}

export default new HrSettingService();
