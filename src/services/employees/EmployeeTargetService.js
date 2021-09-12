import http from "@/http-common";

class EmployeeTargetService {

  getAll(data) {
    return http.get(`/employee-targets?id=${data}`);
  }

  get(id) {
    return http.get(`/employee-targets/${id}`);
  }

  create(data) {
    return http.post("/employee-targets", data);
  }

  update(id, data) {
    return http.patch(`/employee-targets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-targets/${id}`);
  }

}

export default new EmployeeTargetService();
