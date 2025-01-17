import http from "../../http-common";
import Helper from "@/helpers/Helper";

class AwardService extends Helper {
  getAll(page, per_page) {
    let url = "/awards";
    if(page !== '')
    url = super.updateQueryStringParameter(url,"page",page);

   if(per_page !== '')
    url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  get(id) {
    return http.get(`/awards/${id}`);
  }

  create(data) {
    return http.post("/awards", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/awards/${id}`, data);
  }

  delete(id) {
    return http.delete(`/awards/${id}`);
  }
}

export default new AwardService();
