import http from "@/http-common";
import Helper from "@/helpers/Helper";

class SaleReportService extends Helper {

  getSalesByCustomer(date_range, start_date, end_date, branches) {
    let url = `/sales-by-customer-report`;
    if (date_range)
      url = super.updateQueryStringParameter(url, "date_range", date_range);
    if (start_date)
      url = super.updateQueryStringParameter(url, "start_date", start_date);
    if (end_date)
      url = super.updateQueryStringParameter(url, "end_date", end_date);

    if (branches)
      url = super.updateQueryStringParameter(url, "branches", branches);

    return http.get(url);
  }

  getSalesByItem() {
    return http.get(`/sales-by-item-report`);
  }
  getSalesBySalesPerson() {
    return http.get(`/sales-by-sales-person-report`);
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
