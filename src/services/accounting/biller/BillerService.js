import http from "@/http-common";
import Helper from "@/helpers/Helper";

class BillerService extends Helper {

  getAll(page, per_page) {
    let url = "/recurring/bill";

    if (page !== '')
      url = super.updateQueryStringParameter(url, "page", page);

    if (per_page !== '')
      url = super.updateQueryStringParameter(url, "per_page", per_page);

    return http.get(url, super.selectedBranch());
  }

  getBillerOptions() {
    return http.get(`/recurring/bill-options`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/recurring/bill/${id}`);
  }

  create(data, config) {
    config = Object.assign(config, super.selectedBranch());
    return http.post("/recurring/bill", data, config);
  }

  update(id, data, config) {
    return http.post(`/recurring/bill/${id}`, data, config);
  }

  delete(id) {
    return http.delete(`/recurring/bill/${id}`);
  }

}

export default new BillerService();
