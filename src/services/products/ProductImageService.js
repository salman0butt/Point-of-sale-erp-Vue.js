import http from "@/http-common";

class ProductImageService {

    get(id) {
        return http.get(`/products-images/${id}`);
    }

    create(id, data, config) {
        return http.post(`/products-images/${id}`, data, config);
    }

    // delete(id) {
    //     return http.delete(`/products-images/${id}`);
    // }
}

export default new ProductImageService();
