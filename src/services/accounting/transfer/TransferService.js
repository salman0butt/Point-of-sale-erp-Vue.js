import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TransferService extends Helper {

  getAll(page, per_page) {
    let url = "/transfer";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getTransferOptions() {
    return http.get(`/transfer-options`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/transfer/${id}`);
  }

  create(data, config) {
    config = Object.assign(config,super.selectedBranch());
    return http.post("/transfer", data, config);
  }

  update(id, data, config) {
    return http.post(`/transfer/${id}`, data, config);
  }

  delete(id) {
    return http.delete(`/transfer/${id}`);
  }

}

export default new TransferService();
