import http from "@/http-common";

class BranchServices {
    getAll() {
        return http.get("/branches");
    }

    getCreateDetail() {
        return http.get("/employees-create");
    }

    get(id) {
        return http.get(`/branches/${id}`);
    }

    create(data) {
        return http.post("/branches", data);
    }

    update(id, data) {
        return http.put(`/branches/${id}`, data);
    }

    delete(id) {
        return http.delete(`/branches/${id}`);
    }

    deleteAll() {
        return http.delete(`/branches`);
    }
}

export default new BranchServices();
