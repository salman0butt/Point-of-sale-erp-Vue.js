import http from "@/http-common";
import Helper from "@/helpers/Helper";

class JobPostService extends Helper {

  getAll(page, per_page) {
    let url = "/job-posts";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getAllJobCategories() {
    let url = "/job-categories";
    url = super.updateQueryStringParameter(url,"all_data",true);

    return http.get(url, super.selectedBranch());
  }

  get(id) {
    return http.get(`/job-posts/${id}`);
  }

  create(data) {
    return http.post("/job-posts", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/job-posts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/job-posts/${id}`);
  }

}

export default new JobPostService();
