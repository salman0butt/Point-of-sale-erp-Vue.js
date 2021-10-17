import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeSalaryPaymentService extends Helper{

  getAll(empId, page, per_page, all_data = '') {

    let url = 'employee-salary-payments';
    if(empId !== '' && empId !== undefined)
     url = super.updateQueryStringParameter(url,"id",empId);

    if(page !== '' && page !== undefined)
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '' && per_page !== undefined)
     url = super.updateQueryStringParameter(url,"per_page",per_page);

     if(all_data !== '' && all_data !== undefined)
     url = super.updateQueryStringParameter(url,"all_data",true);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-salary-payments/${id}`);
  }

  getAllOptions() {
    return http.get(`/employee-salary-payments-options`);
  }

  create(data) {
    return http.post("/employee-salary-payments", data);
  }

  update(id, data) {
    return http.patch(`/employee-salary-payments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-salary-payments/${id}`);
  }

}

export default new EmployeeSalaryPaymentService();
