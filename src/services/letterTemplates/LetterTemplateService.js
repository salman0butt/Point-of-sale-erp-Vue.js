import http from "@/http-common";
import Helper from "@/helpers/Helper";

class LetterTemplateService extends Helper {

  getAll(page, per_page) {
    let url = "/letter-templates";

    if (page !== '')
      url = super.updateQueryStringParameter(url, "page", page);

    if (per_page !== '')
      url = super.updateQueryStringParameter(url, "per_page", per_page);

    return http.get(url, super.selectedBranch());
  }

  get(id) {
    return http.get(`/letter-templates/${id}`);
  }

  create(data) {
    return http.post("/letter-templates", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/letter-templates/${id}`, data);
  }

  delete(id) {
    return http.delete(`/letter-templates/${id}`);
  }

}

export default new LetterTemplateService();
