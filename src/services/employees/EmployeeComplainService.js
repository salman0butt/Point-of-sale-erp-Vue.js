import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeComplainService extends Helper {

  getAll(emp_id, page, per_page) {
    let url = "/employee-complains";
    if(emp_id !== '')
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-complains/${id}`);
  }

  create(data) {
    return http.post("/employee-complains", data);
  }

  update(id, data) {
    return http.patch(`/employee-complains/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-complains/${id}`);
  }

}

export default new EmployeeComplainService();
