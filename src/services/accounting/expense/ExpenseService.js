import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ExpenseService extends Helper {

  getAll(page, per_page) {
    let url = "/expense";

    if(page !== '')
     url = super.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getExpenseOptions() {
    return http.get(`/expense-options`, super.selectedBranch());
  }

  get(id) {
    return http.get(`/expense/${id}`);
  }

  create(data, config) {
    config = Object.assign(config,super.selectedBranch());
    return http.post("/expense", data, config);
  }

  update(id, data, config) {
    return http.post(`/expense/${id}`, data, config);
  }

  delete(id) {
    return http.delete(`/expense/${id}`);
  }

}

export default new ExpenseService();
