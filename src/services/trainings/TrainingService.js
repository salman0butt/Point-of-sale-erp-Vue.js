import http from "@/http-common";
import Helper from "@/helpers/Helper";

class TrainingService extends Helper {

  getAll(page, per_page) {
    let url = "/trainings";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getAllEmployees() {
    return http.get(`/employees`, super.selectedBranch());
  }

  getAllTrainers() {
    return http.get(`/trainers`, super.selectedBranch());
  }

  getTrainingTypes() {
    return http.get(`/training-types`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/trainings/${id}`);
  }

  create(data) {
    return http.post("/trainings", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/trainings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/trainings/${id}`);
  }

}

export default new TrainingService();
