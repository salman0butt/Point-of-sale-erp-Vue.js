import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeQualificationService extends Helper {

  getAll(data, page, per_page) {

    let url = `/employee-qualifications?id=${data}`;
    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/employee-qualifications/${id}`);
  }

  create(data, config) {
    return http.post("/employee-qualifications", data, config);
  }

  update(id, data, config) {
    return http.post(`/employee-qualifications/${id}`, data, config);
  }

  delete(id) {
    return http.delete(`/employee-qualifications/${id}`);
  }

}

export default new EmployeeQualificationService();
