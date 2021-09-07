import http from "@/http-common";

class EmployeeSalaryService {

  get(id) {
    return http.get(`/employee-salary/${id}`);
  }

  create(data) {
    return http.post("/employee-salary", data);
  }

  update(id, data) {
    return http.patch(`/employee-salary/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-salary/${id}`);
  }

}

export default new EmployeeSalaryService();
