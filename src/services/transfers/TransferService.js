import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TransferService extends Helper {

  getAll(page, per_page) {
    let url = "/employee-transfers";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getAllEmployees() {
    return http.get(`/employees`, super.selectedBranch());
  }

  getAllBranches() {
    return http.get(`/branches?all_data=true`, super.selectedBranch());
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
