import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeAwardService extends Helper {

  getAll(emp_id, page, per_page) {
    let url = "/employee-awards";
    if(emp_id !== '')
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  getAllAwards() {
    return http.get(`/awards`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/employee-awards/${id}`);
  }

  create(data) {
    return http.post("/employee-awards", data);
  }

  update(id, data) {
    return http.patch(`/employee-awards/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-awards/${id}`);
  }

}

export default new EmployeeAwardService();
