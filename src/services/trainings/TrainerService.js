import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TrainerService extends Helper {

  getAll(page, per_page) {
    let url = "/trainers";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  get(id) {
    return http.get(`/trainers/${id}`);
  }

  create(data) {
    return http.post("/trainers", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/trainers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/trainers/${id}`);
  }

}

export default new TrainerService();
