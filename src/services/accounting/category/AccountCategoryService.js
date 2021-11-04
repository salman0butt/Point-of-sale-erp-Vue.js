import http from "@/http-common";
import Helper from "@/helpers/Helper";

class AccountCategoryService extends Helper {

  getAll(page, per_page) {
    let url = "/category";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  get(id) {
    return http.get(`/category/${id}`);
  }

  create(data) {
    return http.post("/category", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/category/${id}`, data);
  }

  delete(id) {
    return http.delete(`/category/${id}`);
  }

}

export default new AccountCategoryService();
