import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeBankAccountService extends Helper {

  getAll(emp_id,page, per_page) {
    let url = "/employee-bank-accounts";
    if(emp_id !== '')
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-bank-accounts/${id}`);
  }

  create(data) {
    return http.post("/employee-bank-accounts", data);
  }

  update(id, data) {
    return http.patch(`/employee-bank-accounts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-bank-accounts/${id}`);
  }

}

export default new EmployeeBankAccountService();
