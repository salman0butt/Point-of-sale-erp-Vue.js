import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TrainingTypeService extends Helper {

  getAll(page, per_page) {
    let url = "/training-types";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/training-types/${id}`);
  }

  create(data) {
    return http.post("/training-types", data);
  }

  update(id, data) {
    return http.patch(`/training-types/${id}`, data);
  }

  delete(id) {
    return http.delete(`/training-types/${id}`);
  }

}

export default new TrainingTypeService();
