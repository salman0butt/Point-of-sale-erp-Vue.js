import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeSalaryAdjustmentService extends Helper{

  getAll(empId, page, per_page, all_data = '') {

    let url = 'employee-salary-adjustments';
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

  genrateSalary(id) {
    return http.get(`/genrate-salary-pdf/${id}`, {
      responseType: 'blob',
    });
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
