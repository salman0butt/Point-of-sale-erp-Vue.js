import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TransferService extends Helper {

  getAll(page, per_page) {
    let url = "/employee-transfers";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  getAllEmployees() {
    return http.get(`/employees`);
  }

  getAllBranches() {
    return http.get(`/branches`);
  }

  get(id) {
    return http.get(`/employee-transfers/${id}`);
  }

  create(data) {
    return http.post("/employee-transfers", data);
  }

  update(id, data) {
    return http.patch(`/employee-transfers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-transfers/${id}`);
  }

}

export default new TransferService();
