import http from "@/http-common";
import Helper from "@/helpers/Helper";

class PaymentBillerService extends Helper {

  getAll(page, per_page) {
    let url = "/payment/biller";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getPaymentBillerOptions() {
    return http.get(`/payment/biller-options`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/payment/biller/${id}`);
  }

  create(data, config) {
    config = Object.assign(config,super.selectedBranch());
    return http.post("/payment/biller", data, super.selectedBranch(), config);
  }

  update(id, data, config) {
    return http.post(`/payment/biller/${id}`, data, config);
  }

  delete(id) {
    return http.delete(`/payment/biller/${id}`);
  }

}

export default new PaymentBillerService();
