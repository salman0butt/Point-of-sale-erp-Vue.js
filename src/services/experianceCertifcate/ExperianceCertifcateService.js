import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ExperianceCertifcateService extends Helper {

  getAll(emp_id, page, per_page) {
    let url = "/experiance-certifcates";
    if(emp_id !== '')
    url = super.updateQueryStringParameter(url,"id",emp_id);

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/experiance-certifcates/${id}`);
  }

  create(data, config) {
    return http.post("/experiance-certifcates", data, config);
  }

  update(id, data, config) {
    return http.post(`/experiance-certifcates/${id}`, data, config);
  }

  delete(id) {
    return http.delete(`/experiance-certifcates/${id}`);
  }

}

export default new ExperianceCertifcateService();
