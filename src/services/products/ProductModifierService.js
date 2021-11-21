import http from "@/http-common";

class ProductModifierService {

    get(id) {
        return http.get(`/product-modifiers/${id}`);
    }

    create(data) {
        return http.post("/product-modifiers", data);
    }

    update(id, data) {
        return http.patch(`/product-modifiers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/product-modifiers/${id}`);
    }
}

export default new ProductModifierService();
