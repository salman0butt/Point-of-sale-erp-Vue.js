import http from "@/http-common";
import Helper from "@/helpers/Helper";

class JobCategoryService extends Helper {

  getAll(page, per_page) {
    let url = "/job-categories";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  get(id) {
    return http.get(`/job-categories/${id}`);
  }

  create(data) {
    return http.post("/job-categories", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/job-categories/${id}`, data);
  }

  delete(id) {
    return http.delete(`/job-categories/${id}`);
  }

}

export default new JobCategoryService();
