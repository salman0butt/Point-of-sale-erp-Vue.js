import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeSalaryAdjustmentService extends Helper{

  getAll(empId, page, per_page) {

    let url = 'employee-salary-adjustments';
    if(empId !== '' && empId !== undefined)
     url = super.updateQueryStringParameter(url,"id",empId);

    if(page !== '' && page !== undefined)
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '' && per_page !== undefined)
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-salary-adjustments/${id}`);
  }

  create(data) {
    return http.post("/employee-salary-adjustments", data);
  }

  update(id, data) {
    return http.patch(`/employee-salary-adjustments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-salary-adjustments/${id}`);
  }

}

export default new EmployeeSalaryAdjustmentService();
