import http from "@/http-common";

class ProductModifierService {

    getAll() {
        return http.get(`/modifiers`);
    }

    update(id, data) {
        return http.patch(`/product-modifiers/${id}`, data);
    }
}

export default new ProductModifierService();
