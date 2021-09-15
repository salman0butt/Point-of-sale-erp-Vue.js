import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeAllowanceService extends Helper {

  getAll(data, page, per_page) {
    let url = `/employee-allowances?id=${data}`;
    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-allowances/${id}`);
  }

  create(data) {
    return http.post("/employee-allowances", data);
  }

  update(id, data) {
    return http.patch(`/employee-allowances/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-allowances/${id}`);
  }

}

export default new EmployeeAllowanceService();
