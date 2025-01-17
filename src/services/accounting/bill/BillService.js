import http from "@/http-common";
import Helper from "@/helpers/Helper";

class BillService extends Helper {

  getAll(page, per_page) {
    let url = "/bill";

    if (page !== '')
      url = super.updateQueryStringParameter(url, "page", page);

    if (per_page !== '')
      url = super.updateQueryStringParameter(url, "per_page", per_page);

    return http.get(url, super.selectedBranch());
  }

  getBillerOptions() {
    return http.get(`/bill-options`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/bill/${id}`);
  }

  create(data, config) {
    config = Object.assign(config, super.selectedBranch());
    return http.post("/bill", data, config);
  }

  update(id, data, config) {
    config = Object.assign(config, super.selectedBranch());
    return http.post(`/bill/${id}`, data, config);
  }

  delete(id) {
    return http.delete(`/bill/${id}`);
  }

}

export default new BillService();
