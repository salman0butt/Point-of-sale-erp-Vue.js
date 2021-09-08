import http from "@/http-common";

class EmployeeQualificationService {

  getAll(data) {
    return http.get(`/employee-qualifications?id=${data}`);
  }

  get(id) {
    return http.get(`/employee-qualifications/${id}`);
  }

  create(data) {
    return http.post("/employee-qualifications", data);
  }

  update(id, data) {
    return http.patch(`/employee-qualifications/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-qualifications/${id}`);
  }

}

export default new EmployeeQualificationService();
