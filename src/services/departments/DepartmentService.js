import http from "../../http-common";
import Helper from "@/helpers/Helper";

class DepartmentService extends Helper {
  getAll(page, per_page) {
    let url = "/departments";
    if(page !== '')
    url = super.updateQueryStringParameter(url,"page",page);

   if(per_page !== '')
    url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  getAllDepartments() {
    return http.get("/fetch-departments");
  }

  get(id) {
    return http.get(`/departments/${id}`);
  }

  create(data) {
    return http.post("/departments", data);
  }

  update(id, data) {
    return http.patch(`/departments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/departments/${id}`);
  }
}

export default new DepartmentService();
