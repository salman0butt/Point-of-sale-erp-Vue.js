import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeEmergencyContactService extends Helper{

  getAll(emp_id,page,per_page) {
    let url = "/employee-emergency-contacts";
    if(emp_id !== '')
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-emergency-contacts/${id}`);
  }

  create(data) {
    return http.post("/employee-emergency-contacts", data);
  }

  update(id, data) {
    return http.patch(`/employee-emergency-contacts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-emergency-contacts/${id}`);
  }

}

export default new EmployeeEmergencyContactService();
