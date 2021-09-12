import http from "@/http-common";

class EmployeeExpenseService {

  getAll(data) {
    return http.get(`/employee-expenses?id=${data}`);
  }

  get(id) {
    return http.get(`/employee-expenses/${id}`);
  }

  create(data) {
    return http.post("/employee-expenses", data);
  }

  update(id, data) {
    return http.patch(`/employee-expenses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-expenses/${id}`);
  }

}

export default new EmployeeExpenseService();
