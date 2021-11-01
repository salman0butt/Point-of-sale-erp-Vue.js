import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ResignationService extends Helper {

  getAll(page, per_page) {
    let url = "/employee-resignations";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, {
      headers: {
        "selected-branches": localStorage.getItem("selected_branches"),
      },
    });
  }

  getAllEmployees() {
    return http.get(`/employees`, {
      headers: {
        "selected-branches": localStorage.getItem("selected_branches"),
      },
    });
  }

  get(id) {
    return http.get(`/employee-resignations/${id}`);
  }

  create(data) {
    return http.post("/employee-resignations", data);
  }

  update(id, data) {
    return http.patch(`/employee-resignations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-resignations/${id}`);
  }

}

export default new ResignationService();
