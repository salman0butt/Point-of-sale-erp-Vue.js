import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TerminationService extends Helper {

  getAll(page, per_page) {
    let url = "/employee-terminations";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  getAllEmployees() {
    return http.get(`/employees`);
  }

  get(id) {
    return http.get(`/employee-terminations/${id}`);
  }

  create(data) {
    return http.post("/employee-terminations", data);
  }

  update(id, data) {
    return http.patch(`/employee-terminations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-terminations/${id}`);
  }

}

export default new TerminationService();
