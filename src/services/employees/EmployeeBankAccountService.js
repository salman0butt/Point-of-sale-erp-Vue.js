import http from "@/http-common";

class EmployeeBankAccountService {

  getAll(data) {
    return http.get(`/employee-bank-accounts?id=${data}`);
  }

  get(id) {
    return http.get(`/employee-bank-accounts/${id}`);
  }

  create(data) {
    return http.post("/employee-bank-accounts", data);
  }

  update(id, data) {
    return http.patch(`/employee-bank-accounts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-bank-accounts/${id}`);
  }

}

export default new EmployeeBankAccountService();
