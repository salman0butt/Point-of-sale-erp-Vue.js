import http from "../../http-common";

class EmployeeService {
  getAll() {
    return http.get("/employees");
  }

  getTotalCount() {
    return http.get("/employees-total-counts");
  }

  getCreateDetail() {
    return http.get("/employees-create");
  }

  get(id) {
    return http.get(`/employees/${id}`);
  }

  create(data, config) {
    return http.post("/employees", data, config);
  }

  update(id, data) {
    return http.put(`/employees/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employees/${id}`);
  }

  deleteAll() {
    return http.delete(`/employees`);
  }
}

export default new EmployeeService();
