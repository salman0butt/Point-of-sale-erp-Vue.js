import http from "../../http-common";

class DesignationService {
  getAll() {
    return http.get("/designations");
  }

  get(id) {
    return http.get(`/designations/${id}`);
  }

  create(data) {
    return http.post("/designations", data);
  }

  update(id, data) {
    return http.patch(`/designations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/designations/${id}`);
  }
}

export default new DesignationService();
