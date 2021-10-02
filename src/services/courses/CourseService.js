import http from "@/http-common";
import Helper from "@/helpers/Helper";

class CourseService extends Helper {

  getAll(page, per_page) {
    let url = "/courses";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  getAllEmployees() {
    return http.get(`/employees`);
  }

  get(id) {
    return http.get(`/courses/${id}`);
  }

  create(data) {
    return http.post("/courses", data);
  }

  update(id, data) {
    return http.patch(`/courses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/courses/${id}`);
  }

}

export default new CourseService();
