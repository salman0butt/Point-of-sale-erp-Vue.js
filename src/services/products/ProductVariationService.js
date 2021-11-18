import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ProductVariationService extends Helper {
    getAll(page, per_page) {
        let url = "/product-variations";

        if (page !== '' && page !== undefined && page !== null)
            url = super.updateQueryStringParameter(url, "page", page);

        if (per_page !== '' && per_page !== undefined && per_page !== null)
            url = super.updateQueryStringParameter(url, "per_page", per_page);

        return http.get(url, super.selectedBranch());
    }

    get(id) {
        return http.get(`/product-variations/${id}`);
    }

    getProductVariationOptions(product_id) {
      let url = "/product-variations-options";
      if (product_id !== '' && product_id !== undefined && product_id !== null)
            url = super.updateQueryStringParameter(url, "product_id", product_id);

        return http.get(url);
    }

    create(data) {
        return http.post("/product-variations", data, super.selectedBranch());
    }

    update(id, data) {
        return http.patch(`/product-variations/${id}`, data);
    }

    delete(id) {
        return http.delete(`/product-variations/${id}`);
    }
}

export default new ProductVariationService();
