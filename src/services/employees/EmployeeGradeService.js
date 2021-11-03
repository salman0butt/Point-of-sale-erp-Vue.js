import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeGradeService extends Helper {

  getAll(page, per_page) {
    let url = "/employee-grades";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getAllDesignations() {
    return http.get(`/designations`, super.selectedBranch());
  }

  getAllEmployees() {
    return http.get(`/employees`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/employee-grades/${id}`);
  }

  create(data) {
    return http.post("/employee-grades", data);
  }

  update(id, data) {
    return http.patch(`/employee-grades/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-grades/${id}`);
  }

}

export default new EmployeeGradeService();
