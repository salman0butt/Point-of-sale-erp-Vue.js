import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeLeaveService extends Helper {

  getAll(emp_id, page, per_page, all_data = '') {
    let url = "/leaves";
    if(emp_id !== '')
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

     if(all_data !== '' && all_data !== undefined)
     url = super.updateQueryStringParameter(url,"all_data",true);

    return http.get(url, super.selectedBranch());
  }

  get(id) {
    return http.get(`/leaves/${id}`);
  }


  changeLeaveStatus(id, data) {
    return http.patch(`/leaves-status/${id}`, data);
  }


  create(data) {
    return http.post("/leaves", data);
  }

  update(id, data) {
    return http.patch(`/leaves/${id}`, data);
  }

  delete(id) {
    return http.delete(`/leaves/${id}`);
  }


}

export default new EmployeeLeaveService();
