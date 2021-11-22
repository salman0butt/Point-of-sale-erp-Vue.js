import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ProductInventoryService extends Helper {

    get(id) {
        return http.get(`/product-stocks/${id}`);
    }
    create(data) {
        return http.post("/product-stocks", data);
    }

    update(id, data) {
        return http.patch(`/product-stocks/${id}`, data);
    }

}

export default new ProductInventoryService();
