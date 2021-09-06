import http from "@/http-common";

class EmployeeDetailService {

  get(id) {
    return http.get(`/employee-details/${id}`);
  }

  create(data) {
    return http.post("/employee-details", data);
  }

  update(id, data) {
    return http.patch(`/employee-details/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-details/${id}`);
  }

}

export default new EmployeeDetailService();
