import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeComplainService extends Helper {

  getAll(emp_id, page, per_page, all_data = '') {
    let url = "/employee-complains";
    if(emp_id !== '' && emp_id !== undefined)
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '' && page !== undefined)
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '' && per_page !== undefined)
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    if(all_data !== '' && all_data !== undefined)
     url = super.updateQueryStringParameter(url,"all_data",true);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-complains/${id}`);
  }

  create(data) {
    return http.post("/employee-complains", data);
  }

  update(id, data) {
    return http.patch(`/employee-complains/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-complains/${id}`);
  }

}

export default new EmployeeComplainService();
