import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeService extends Helper {
  getAll(page, per_page) {
    let url = "/employees";
    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);
    return http.get(url);
  }

  getTotalCount() {
    return http.get("/employees-total-counts");
  }

  getCreateDetail() {
    return http.get("/employees-create");
  }

  get(id) {
    return http.get(`/employees/${id}`);
  }

  create(data, config) {
    return http.post("/employees", data, config);
  }

  update(id, data) {
    return http.patch(`/employees/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employees/${id}`);
  }

  deleteAll() {
    return http.delete(`/employees`);
  }
}

export default new EmployeeService();
