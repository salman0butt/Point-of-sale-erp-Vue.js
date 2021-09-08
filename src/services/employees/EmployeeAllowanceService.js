import http from "@/http-common";

class EmployeeAllowanceService {

  getAll(data) {
    return http.get(`/employee-allowances?id=${data}`);
  }

  get(id) {
    return http.get(`/employee-allowances/${id}`);
  }

  create(data) {
    return http.post("/employee-allowances", data);
  }

  update(id, data) {
    return http.patch(`/employee-allowances/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-allowances/${id}`);
  }

}

export default new EmployeeAllowanceService();
