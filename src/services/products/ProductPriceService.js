import http from "@/http-common";

class ProductPriceService {

    get(id) {
        return http.get(`/product-price/${id}`);
    }

    create(data) {
        return http.post("/product-price", data);
    }

    update(id, data) {
        return http.patch(`/product-price/${id}`, data);
    }

    delete(id) {
        return http.delete(`/product-price/${id}`);
    }
}

export default new ProductPriceService();
