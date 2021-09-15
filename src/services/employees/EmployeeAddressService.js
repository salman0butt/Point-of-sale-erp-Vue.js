import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeAddressService extends Helper {

  getAll(data, page, per_page) {
    let url = `/employee-addresses?id=${data}`;
    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-addresses/${id}`);
  }

  create(data) {
    return http.post("/employee-addresses", data);
  }

  update(id, data) {
    return http.patch(`/employee-addresses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-addresses/${id}`);
  }

}

export default new EmployeeAddressService();
