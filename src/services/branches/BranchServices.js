import http from "../../http-common";

class BranchServices {
    getAll() {
        return http.get("/employees");
    }

    getCreateDetail() {
        return http.get("/employees-create");
    }

    get(id) {
        return http.get(`/employees/${id}`);
    }

    create(data) {
        return http.post("/branches", data);
    }

    update(id, data) {
        return http.put(`/branches/${id}`, data);
    }

    delete(id) {
        return http.delete(`/employees/${id}`);
    }

    deleteAll() {
        return http.delete(`/employees`);
    }
}

export default new BranchServices();
