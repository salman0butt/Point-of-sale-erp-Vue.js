import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeLoanInstallmentService extends Helper {

  getAll(emp_id, page, per_page) {
    let url = "/employee-loan-installment-plans";
    if(emp_id !== '')
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  fetchEmployeeLoans(id) {
    return http.get(`/fetchEmployeeLoans/${id}`);
  }

  get(id) {
    return http.get(`/employee-loan-installment-plans/${id}`);
  }

  create(data) {
    return http.post("/employee-loan-installment-plans", data);
  }

  update(id, data) {
    return http.patch(`/employee-loan-installment-plans/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-loan-installment-plans/${id}`);
  }

}

export default new EmployeeLoanInstallmentService();
