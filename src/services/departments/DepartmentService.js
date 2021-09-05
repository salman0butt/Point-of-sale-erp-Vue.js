import http from "../../http-common";

class DepartmentService {
  getAll() {
    return http.get("/departments");
  }

  getAllDepartments() {
    return http.get("/fetch-departments");
  }

  get(id) {
    return http.get(`/departments/${id}`);
  }

  create(data) {
    return http.post("/departments", data);
  }

  update(id, data) {
    return http.patch(`/departments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/departments/${id}`);
  }
}

export default new DepartmentService();
