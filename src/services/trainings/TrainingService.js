import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TrainingService extends Helper {

  getAll(page, per_page) {
    let url = "/trainings";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  getAllEmployees() {
    return http.get(`/employees`);
  }

  getAllTrainers() {
    return http.get(`/trainers`);
  }

  getTrainingTypes() {
    return http.get(`/training-types`);
  }

  get(id) {
    return http.get(`/trainings/${id}`);
  }

  create(data) {
    return http.post("/trainings", data);
  }

  update(id, data) {
    return http.patch(`/trainings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/trainings/${id}`);
  }

}

export default new TrainingService();
