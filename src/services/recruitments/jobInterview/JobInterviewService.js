import http from "@/http-common";
import Helper from "@/helpers/Helper";

class JobInterviewService extends Helper {

  getAll(page, per_page) {
    let url = "/job-interviews";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/job-interviews/${id}`);
  }

  getInterviewOptions() {
    return http.get('job-interviews-options');
  }

  create(data) {
    return http.post("/job-interviews", data);
  }

  update(id, data) {
    return http.patch(`/job-interviews/${id}`, data);
  }

  delete(id) {
    return http.delete(`/job-interviews/${id}`);
  }

}

export default new JobInterviewService();
