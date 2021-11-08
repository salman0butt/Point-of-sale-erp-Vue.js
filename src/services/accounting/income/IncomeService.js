import http from "@/http-common";
import Helper from "@/helpers/Helper";

class IncomeService extends Helper {

  getAll(page, per_page) {
    let url = "/income";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getIncomeOptions() {
    return http.get(`/income-options`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/income/${id}`);
  }

  create(data, config) {
    config = Object.assign(config,super.selectedBranch());
    return http.post("/income", data, config);
  }

  update(id, data, config) {
    return http.post(`/income/${id}`, data, config);
  }

  delete(id) {
    return http.delete(`/income/${id}`);
  }

}

export default new IncomeService();
