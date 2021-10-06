import http from "@/http-common";
import Helper from "@/helpers/Helper";

class JobCandidateService extends Helper {

  getAll(page, per_page) {
    let url = "/job-candidates";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/job-candidates/${id}`);
  }

  create(data) {
    return http.post("/job-candidates", data);
  }

  update(id, data) {
    return http.patch(`/job-candidates/${id}`, data);
  }

  delete(id) {
    return http.delete(`/job-candidates/${id}`);
  }

}

export default new JobCandidateService();
