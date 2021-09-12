import http from "@/http-common";

class EmployeeEmergencyContactService {

  getAll(data) {
    return http.get(`/employee-emergency-contacts?id=${data}`);
  }

  get(id) {
    return http.get(`/employee-emergency-contacts/${id}`);
  }

  create(data) {
    return http.post("/employee-emergency-contacts", data);
  }

  update(id, data) {
    return http.patch(`/employee-emergency-contacts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-emergency-contacts/${id}`);
  }

}

export default new EmployeeEmergencyContactService();
