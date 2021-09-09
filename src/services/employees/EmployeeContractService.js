import http from "@/http-common";

class EmployeeContractService {

  getAll(data) {
    return http.get(`/employee-contracts?id=${data}`);
  }

  get(id) {
    return http.get(`/employee-contracts/${id}`);
  }

  create(data) {
    return http.post("/employee-contracts", data);
  }

  update(id, data) {
    return http.patch(`/employee-contracts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-contracts/${id}`);
  }

}

export default new EmployeeContractService();
