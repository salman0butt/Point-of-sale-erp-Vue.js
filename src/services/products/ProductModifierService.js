import http from "@/http-common";

class ProductModifierService {

    getProductModifier(id) {
      return http.get(`/modifiers-attach/${id}`);
    }
    getAll() {
        return http.get(`/modifiers`);
    }

    update(id, data) {
        return http.post(`/modifiers-attach/${id}`, data);
    }
}

export default new ProductModifierService();
