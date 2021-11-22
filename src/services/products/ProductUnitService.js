import http from "@/http-common";

class ProductUnitService {

    get(id) {
        return http.get(`/product-quantity-units/${id}`);
    }

    create(data) {
        return http.post("/product-quantity-units", data);
    }

    update(id, data) {
        return http.patch(`/product-quantity-units/${id}`, data);
    }

    delete(id) {
        return http.delete(`/product-quantity-units/${id}`);
    }
}

export default new ProductUnitService();
