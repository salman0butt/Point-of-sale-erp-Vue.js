import http from "@/http-common";
import Helper from "@/helpers/Helper";

class JobInterviewerService extends Helper {

  getAll(page, per_page) {
    let url = "/job-interviewers";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  get(id) {
    return http.get(`/job-interviewers/${id}`);
  }

  create(data) {
    return http.post("/job-interviewers", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/job-interviewers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/job-interviewers/${id}`);
  }

}

export default new JobInterviewerService();
