import http from "@/http-common";

class EmployeeLicenseService {

  getAll(data) {
    return http.get(`/employee-licenses?id=${data}`);
  }

  get(id) {
    return http.get(`/employee-licenses/${id}`);
  }

  create(data) {
    return http.post("/employee-licenses", data);
  }

  update(id, data) {
    return http.patch(`/employee-licenses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-licenses/${id}`);
  }

}

export default new EmployeeLicenseService();
