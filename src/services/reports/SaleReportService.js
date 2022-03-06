import http from "@/http-common";
import Helper from "@/helpers/Helper";

class SaleReportService extends Helper {

  getSalesByCustomer() {
    return http.get(`/sales-by-customer-report`);
  }

  getSalesByItem() {
    return http.get(`/sales-by-item-report`);
  }

  // getAll(page, per_page) {
  //   let url = "/employee-resignations";

  //   if (page !== '')
  //     url = super.updateQueryStringParameter(url, "page", page);

  //   if (per_page !== '')
  //     url = super.updateQueryStringParameter(url, "per_page", per_page);

  //   return http.get(url, super.selectedBranch());
  // }

  // getAllEmployees() {
  //   return http.get(`/employees`, super.selectedBranch());
  // }

  // get(id) {
  //   return http.get(`/employee-resignations/${id}`);
  // }

  // create(data) {
  //   return http.post("/employee-resignations", data);
  // }

  // update(id, data) {
  //   return http.patch(`/employee-resignations/${id}`, data);
  // }

  // delete(id) {
  //   return http.delete(`/employee-resignations/${id}`);
  // }

}

export default new SaleReportService();
