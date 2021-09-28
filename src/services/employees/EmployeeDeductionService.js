import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeDeductionsService extends Helper {

  getAll(emp_id, page, per_page) {
    let url = "/employee-deductions";
    if(emp_id !== '')
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-deductions/${id}`);
  }

  create(data) {
    return http.post("/employee-deductions", data);
  }

  update(id, data) {
    return http.patch(`/employee-deductions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-deductions/${id}`);
  }

}

export default new EmployeeDeductionsService();