import http from "@/http-common";

class EmployeeAddressService {

  getAll(data) {
    return http.get(`/employee-addresses?id=${data}`);
  }

  get(id) {
    return http.get(`/employee-addresses/${id}`);
  }

  create(data) {
    return http.post("/employee-addresses", data);
  }

  update(id, data) {
    return http.patch(`/employee-addresses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-addresses/${id}`);
  }

}

export default new EmployeeAddressService();
