import http from "@/http-common";
import Helper from "@/helpers/Helper";

class BillerService extends Helper {

  getAll(page, per_page) {
    let url = "/biller";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getBillerOptions() {
    return http.get(`/biller-options`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/biller/${id}`);
  }

  create(data) {
    return http.post("/biller", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/biller/${id}`, data);
  }

  delete(id) {
    return http.delete(`/biller/${id}`);
  }

}

export default new BillerService();
