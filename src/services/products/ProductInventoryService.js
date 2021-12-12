import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ProductInventoryService extends Helper {

    get(id) {
        return http.get(`/product-stocks/${id}`);
    }

    getVariations(id) {
        return http.get(`/product-variation-stocks/${id}`);
    }

    create(data) {
        return http.post("/product-stocks", data, super.selectedBranch());
    }

    createVariations(data) {
        return http.post("/product-variation-stocks", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/product-stocks/${id}`, data);
    }

    updateVariations(id, data) {
        return http.patch(`/product-variation-stocks/${id}`, data);
    }

}

export default new ProductInventoryService();
