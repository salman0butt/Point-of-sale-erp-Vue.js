import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeAssetService extends Helper {

  getAll(emp_id, page, per_page) {
    let url = "/employee-assets";
    if(emp_id !== '')
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  getAllAssets() {
    return http.get(`/assets`);
  }

  get(id) {
    return http.get(`/employee-assets/${id}`);
  }

  create(data) {
    return http.post("/employee-assets", data);
  }

  update(id, data) {
    return http.patch(`/employee-assets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-assets/${id}`);
  }

}

export default new EmployeeAssetService();
