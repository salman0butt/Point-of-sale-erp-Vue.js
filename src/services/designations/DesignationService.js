import http from "@/http-common";
import Helper from "@/helpers/Helper";

class DesignationService extends Helper {
  getAll(page, per_page) {
    let url = "/designations";
    if (page !== '')
      url = super.updateQueryStringParameter(url, "page", page);

    if (per_page !== '')
      url = super.updateQueryStringParameter(url, "per_page", per_page);

    return http.get(url, super.selectedBranch());
  }

  get(id) {
    return http.get(`/designations/${id}`);
  }

  create(data) {
    return http.post("/designations", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/designations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/designations/${id}`);
  }

}

export default new DesignationService();
