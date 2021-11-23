import http from "@/http-common";

class ProductGeneralService {

    get(id) {
        return http.get(`/product-general/${id}`);
    }

    create(data) {
        return http.post("/product-general", data);
    }

    update(id, data) {
        return http.patch(`/product-general/${id}`, data);
    }

    delete(id) {
        return http.delete(`/product-general/${id}`);
    }
}

export default new ProductGeneralService();
