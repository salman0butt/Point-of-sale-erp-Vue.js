import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeSalaryService extends Helper{

  get(id) {
    return http.get(`/employee-salary/${id}`);
  }

  genrateSalary(id, year, month, monthName) {
    let url = `/salary/${id}`;

    if(year !== '' && year != undefined)
     url = super.updateQueryStringParameter(url,"year",year);

    if(month !== '' && month != undefined)
     url = super.updateQueryStringParameter(url,"month",month);

    if(monthName !== '' && monthName != undefined)
     url = super.updateQueryStringParameter(url,"month_name",monthName);

    return http.get(url);
  }

  create(data) {
    return http.post("/employee-salary", data);
  }

  update(id, data) {
    return http.patch(`/employee-salary/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-salary/${id}`);
  }

}

export default new EmployeeSalaryService();
